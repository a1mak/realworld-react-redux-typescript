import { ErrorBody } from "api/types";
import { FC } from "react";

interface IErrorMessagesProps extends ErrorBody {}

const ErrorMessages: FC<IErrorMessagesProps> = ({ errors }) => {
  const errorEntries = Object.entries(errors);

  return errorEntries.length ? (
    <ul className="error-messages">
      {errorEntries.map(([field, messages]) => (
        <li key={field}>
          {field}
          {messages.length > 1
            ? " :" +
              messages.map((message, index) => (
                <div key={index}> - {message};</div>
              ))
            : " " + messages}
        </li>
      ))}
    </ul>
  ) : null;
};

export default ErrorMessages;
