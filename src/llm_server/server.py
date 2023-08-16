from huggingface_hub import hf_hub_download
from llama_cpp import Llama
from flask import Flask, make_response, jsonify, request
from flask_cors import CORS

#global variables
CPU_CORES=2 #number of cpu cores used during inference
N_BATCHES=512 #number of tokens processed in parallel
GPU_LAYERS=32 #number of layers stored and computed in the GPU
PROMPT_TEMPLATE = '''
                    SYSTEM: You are chatbot embedded in a AI agency website. Your job is to answer questions that customers give you. Keep your answers as concise as possible and use "END" to mark the end of your answers. If you don't know the answer say: "I couldn't quite get that question, contact our team instead".
                    USER: <prompt>
                    ASSISTANT:
                  ''' #template of prompt to feed to model, replacing <prompt> with the user's message
MAX_TOKENS = 256 #maximum number of tokens that can be produced in a response


#load the model from storage (since it has already been downloaded)
model_name = "TheBloke/Llama-2-7B-chat-GGML"
model_basename = "llama-2-7b-chat.ggmlv3.q4_0.bin"
model_path = hf_hub_download(repo_id=model_name,
                            filename=model_basename,
                            cache_dir='./llama_model')

#wrap the model using the llama cpp wrapper for fast inference
lccp_llm = Llama(
    model_path=model_path, 
    n_threads=CPU_CORES, 
    n_batch=N_BATCHES, 
    n_gpu_layers=GPU_LAYERS
)

#flask app config
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['URL'] = 'http://localhost:8080'

#allow CORS
cors = CORS(app, supports_credentials=True)

#flask app endpoint
@app.route('/reply', methods=['GET'])
def reply():
    prompt = request.headers.get('prompt')

    #check if user provided a prompt
    if prompt:
        #generate model input string using prompt template
        model_input = PROMPT_TEMPLATE.replace('<prompt>', prompt)
        print('Generating response ...')

        #use llm model to generate the response
        model_response = lccp_llm(
            prompt=model_input, 
            max_tokens=MAX_TOKENS, 
            temperature=0.5, 
            top_p=0.95, 
            top_k=3,
            repeat_penalty=1.2
        )

        #extract response text from response dictionary
        model_response_text = model_response['choices'][0]['text'].split('END')[0].strip()

        #return the response text in the endpoint's response body
        response = make_response(jsonify({
            'success': True, 
            'message': model_response_text
        }))
        response.status_code = 200

    else:
        #if the user did not provide the prompt header, respond with error message
        response = make_response(jsonify({
            'success': False, 
            'message': 'Missing required header: "prompt"'
        }))
        response.status_code = 200

    
    return response





if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)

    


