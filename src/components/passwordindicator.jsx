
import zxcvbn from 'zxcvbn';
import './PasswordStrengthIndicator.css';

// eslint-disable-next-line react/prop-types
const PasswordStrengthIndicator = ({ password }) => {
  const result = zxcvbn(password);
  const strength = result.score;
  const feedback = result.feedback.suggestions.join(' ') || 'Good password';

  const strengthLabels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#850707', '#850707' ,'#6cf08b', '#088a38', '#055217'];

  return (
    <div className="strength-indicator">
      <p>
        Password Strength:{' '}
        <span className="strength-label" style={{ color: strengthColors[strength] }}>
          {strengthLabels[strength]}
        </span>
      </p>
      <p className="feedback">{feedback}</p>
    </div>
  );
};

export default PasswordStrengthIndicator;
