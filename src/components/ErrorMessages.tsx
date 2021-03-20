type ErrorMessagesProps = {
  /**
   * Accepts object with errors grouped by field,
   * eg. `firstName: ["Invalid characters", "Too short"]`
   * @type {Record<string, string[]>}
   */
  errors: Record<string, string[]>;
};

/**
 * Displays request errors grouped by type
 *
 * @param {*} { errors }
 * @return {*}
 */
const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors }) => {
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
