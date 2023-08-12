// component used to show choice message (using buttons) in the chat
import { useState } from "react";

// TODO: retain state when window is closed

function ChatMessageChoice({ message, addUserMessage }) {
  // message: {
  //  sender: 'bot',
  //  type: 'choice',
  //  tag: string,
  //  options: [{
  //            'text': string,
  //            'icon': Component | null
  //           }]
  //}

  //addUserMessage: void(string text) => adds a new user message with the value of the text string to the chat
  const [isOptionEnabled, toggleState] = useState(true);
  const [optionSelected, setSelection] = useState(null);

  const selectOption = (option) => {
    addUserMessage(option.text);
    setSelection(option);
    toggleState(false);
  };

  return (
    <div>
      {message.options.map((option) => {
        return (
          <button
            class={`option-button ${!isOptionEnabled && "disabled"}`}
            onClick={() => selectOption(option)}
            disabled={!isOptionEnabled} //after selecting an option, the buttons must become disabled to prevent user from selecting multiple options
          >
            <div className="option-container">
              {option.icon != null && option.icon}
              <p
                className={`option-text ${
                  option === optionSelected && "selected"
                }`}
              >
                {option.text}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default ChatMessageChoice;
