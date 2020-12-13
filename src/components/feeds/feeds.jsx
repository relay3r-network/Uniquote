import React, { Component } from "react";
import * as moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  CircularProgress,
  Paper
} from '@material-ui/core';

import Store from "../../stores";
import { colors } from '../../theme'

import {
  GET_FEEDS,
  FEEDS_RETURNED,
  FEEDS_UPDATED,
} from '../../constants'

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    maxWidth: '900px',
    width: '100%',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: '40px'
  },
  feedContainer: {
    background: colors.darkGray,
    width: '200px',
    padding: '24px 8px',
    minHeight: '280px',
    margin: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    '&:hover': {
      elevation24:true      // background: colors.lightGray
    }
  },
  pricePoint: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '6px 0px'
  },
  updated: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '24px',
    marginBottom: '6px'
  },
  pair: {
    marginBottom: '6px'
  },
  volatilityHead: {
    marginTop: '24px',
    marginBottom: '6px'
  },
  volatility: {
    margin: '6px 0px'
  },
  gray: {
    color: colors.darkGray
  }
})

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class Feeds extends Component {

  constructor(props) {
    super()

    const feeds = store.getStore('feeds')

    this.state = {
      feeds: feeds,
      shadows: {}
    }

    dispatcher.dispatch({ type: GET_FEEDS, content: { } })
  };
  onMouseOver = (itemx) => this.setState({ shadow: {itemx:10} });
  onMouseOut = (itemx) => this.setState({ shadow: {itemx:3}});
  componentWillMount() {
    emitter.on(FEEDS_UPDATED, this.feedsReturned);
    emitter.on(FEEDS_RETURNED, this.feedsReturned);
  };

  componentWillUnmount() {
    emitter.removeListener(FEEDS_UPDATED, this.feedsReturned);
    emitter.removeListener(FEEDS_RETURNED, this.feedsReturned);
  };

  feedsReturned = () => {
    this.setState({ feeds: store.getStore('feeds') })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={ classes.root }>
        { this.renderFeeds() }
      </div>
    )
  }

  renderFeeds = () => {
    const {
      feeds,
    } = this.state

    if(!feeds) {
      return <div></div>
    }

    return feeds.map((feed) => {
      return this.renderFeed(feed)
    })
  }

  renderFeed = (feed) => {
    const { classes } = this.props;

    return (
      <Paper className={ classes.feedContainer } key={ feed.token0 ? feed.token0.address : feed }
      elevation={3}
      >
        { (!feed.token0 || !feed.token1) && <CircularProgress className={ classes.absoluteCenter } /> }
        { feed.token0 && feed.token1 &&
          <div className={ classes.pair }>
            <Typography variant='h2'>{ feed.token0.symbol } / { feed.token1.symbol }</Typography>
          </div>
        }
        { feed.token0 && feed.token1 &&
          <div className={ classes.pricePoint }>
            <Typography variant='h3'>{ feed.consult && feed.consult.consult0To1 ? feed.consult.consult0To1.toFixed(4) : '0.00' } ETH</Typography>
          </div>
        }
        { feed.token0 && feed.token1 && feed.priceToken0 &&
          <div className={ classes.pricePoint }>
            <Typography variant='h3'>$ { feed.priceToken0 ? feed.priceToken0 : '0.00' } </Typography>
          </div>
        }
        { feed.volatility &&
          <div className={ classes.volatilityHead }>
            <Typography variant='h2'>Volatility</Typography>
          </div>
        }
        { feed.volatility && feed.volatility.realizedVolatility && (!feed.volatility.realizedVolatilityHourly && !feed.volatility.realizedVolatilityDaily && !feed.volatility.realizedVolatilityWeekly) &&
          <div className={ classes.volatility }>
            <Typography variant='h3'>{ feed.volatility.realizedVolatility.toFixed(2) }%</Typography>
          </div>
        }
        { feed.volatility && feed.volatility.realizedVolatilityHourly &&
          <div className={ classes.volatility }>
            <Typography variant='h3'>Hourly: { feed.volatility.realizedVolatilityHourly.toFixed(2) }%</Typography>
          </div>
        }
        { feed.volatility && feed.volatility.realizedVolatilityDaily &&
          <div className={ classes.volatility }>
            <Typography variant='h3'>Daily: { feed.volatility.realizedVolatilityDaily.toFixed(2) }%</Typography>
          </div>
        }
        { feed.volatility && !feed.volatility.realizedVolatility && !feed.volatility.realizedVolatilityHourly && !feed.volatility.realizedVolatilityDaily && !feed.volatility.realizedVolatilityWeekly &&
          <div className={ classes.volatility }>
            <Typography variant='h3'>Unknown</Typography>
          </div>
        }
        {/* { feed.quote &&
          <div className={ classes.volatilityHead }>
            <Typography variant='h2'>Options</Typography>
          </div>
        }
        { feed.quote &&
          <div className={ classes.volatility }>
            { feed.quote.call && <Typography variant='h3'>Call: $ { feed.quote.call.toFixed(2) } </Typography> }
            { !feed.quote.call && <Typography variant='h3'>Call: Unknown</Typography> }
          </div>
        }
        { feed.quote &&
          <div className={ classes.volatility }>
            { feed.quote.put && <Typography variant='h3'>Put: $ { feed.quote.put.toFixed(2) } </Typography> }
            { !feed.quote.put && <Typography variant='h3'>Put: Unknown</Typography> }
          </div>
        }
        { feed.lastUpdated &&
          <div className={ classes.updated }>
            <Typography variant='h6'>Last updated: { moment(feed.lastUpdated*1000).fromNow() }</Typography>
          </div>
        } */}
      </Paper>
    )
  }
}

export default withStyles(styles)(Feeds);
