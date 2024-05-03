import PropTypes from 'prop-types';
import classes from './Modal.module.css'

Modal.propTypes = {
  newGame: PropTypes.func,
  score: PropTypes.number,
  bestScore: PropTypes.array
}

export default function Modal ({ newGame, score, bestScore }) {

  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <div className={classes.actions}>
          <div>
            <p>Счет:{score}</p>
            <p>Лучший счет:{bestScore}</p>
          </div>
          <button onClick={newGame}>Новая игра</button>
        </div>
      </div>
    </div>
  );
}