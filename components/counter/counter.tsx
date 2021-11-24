import Button from '@material-ui/core/Button';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import { decrementCounter, incrementCounter } from 'features/counter/actions';
import { getCount } from 'features/counter/selectors';
import { RootState } from 'features/redux/root-reducer';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

const styles = (theme: Theme) => createStyles({
  textColor: {
    color: theme.palette.primary.main,
  },
});

interface StateProps {
  count: number;
}

interface DispatchProps {
  onDecrement: () => void;
  onIncrement: () => void;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

class Counter extends PureComponent<Props> {
  render() {
    const { classes, count, onDecrement, onIncrement } = this.props;
    return (
      <>
        <Typography variant="h1" className={classes.textColor}>Count: {count}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onIncrement}
        >
          +
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onDecrement}
        >
          -
        </Button>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const count = getCount(state);

  return {
    count,
  };
};

const mapDispatchToProps = {
  onDecrement: decrementCounter,
  onIncrement: incrementCounter,
};

export default connect<StateProps, DispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)
  (withStyles(styles)(Counter));
