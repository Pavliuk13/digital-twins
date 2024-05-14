import { memo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import _minBy from 'lodash/minBy';
import _maxBy from 'lodash/maxBy';
import classNames from 'classnames';

import Typography from '@@components/ui/Typography';
import Card from '@@components/common/Card';
import Button from '@@components/ui/Button';

import { usePageContentContext } from '@@contexts/PageContentContext';

import { shortDateFormat } from '@@utils/date/shortDateFormat';
import { dateFormat } from '@@utils/date/dateFormat';

import { Data } from '../types';

import styles from './DeviceStatistics.module.scss';

function CustomTooltip({ active, payload }) {
  if (active && payload?.length) {
    const [data] = payload;

    return (
      <Card>
        <Typography variant="description">
          {dateFormat(data.payload.statsTime)}
        </Typography>
        <Typography variant="note">
          FM RSSI level conversion: {data.payload.rssi}
        </Typography>
        <Typography variant="note">
          Heap usage: {data.payload.heapUsage}
        </Typography>
        <Typography variant="note">
          Task count: {data.payload.lightSwitchCount}
        </Typography>
      </Card>
    );
  }

  return null;
}

function DeviceStatistics() {
  const [activeFilter, setActiveFilter] = useState('rssi');

  const {
    data: { deviceStatistics },
    isLoading,
    refetch,
  } = usePageContentContext<Data>();

  const handleRssiFilter = () => {
    setActiveFilter('rssi');
  };

  const handleHeapUsageFilter = () => {
    setActiveFilter('heapUsage');
  };

  const handleTaskCountFilter = () => {
    setActiveFilter('lightSwitchCount');
  };

  return (
    <div className={styles.wrapper}>
      <Card isScale={false}>
        <div className={styles.header}>
          <Typography variant="subheading2" bottomOffset={16}>
            Statistics
          </Typography>
          <Button
            variant="outline"
            color="grey_200"
            size="small"
            disabled={isLoading}
            onClick={refetch}
          >
            Refresh
          </Button>
        </div>
        <div className={styles.statistics}>
          {deviceStatistics.length ? (
            <>
              <div className={styles.filters}>
                <Typography variant="note">Statistics by</Typography>
                <Button
                  variant="outline"
                  color="grey_200"
                  size="small"
                  className={classNames({
                    [styles.filters__filter_active]: activeFilter === 'rssi',
                  })}
                  onClick={handleRssiFilter}
                >
                  Rssi
                </Button>
                <Button
                  variant="outline"
                  color="grey_200"
                  size="small"
                  className={classNames({
                    [styles.filters__filter_active]:
                      activeFilter === 'heapUsage',
                  })}
                  onClick={handleHeapUsageFilter}
                >
                  Heap usage
                </Button>
                <Button
                  variant="outline"
                  color="grey_200"
                  size="small"
                  className={classNames({
                    [styles.filters__filter_active]:
                      activeFilter === 'lightSwitchCount',
                  })}
                  onClick={handleTaskCountFilter}
                >
                  Task count
                </Button>
              </div>
              <ResponsiveContainer width="100%" height="100%" maxHeight={500}>
                <span className={styles.dot}>.</span>
                <LineChart width={500} height={350} data={deviceStatistics}>
                  <CartesianGrid />
                  <XAxis
                    dataKey="statsTime"
                    tickFormatter={shortDateFormat}
                    className={styles.xAxis}
                  />
                  <YAxis
                    width={80}
                    domain={[
                      _minBy(deviceStatistics, activeFilter) - 0.5,
                      _maxBy(deviceStatistics, activeFilter) + 0.5,
                    ]}
                    className={styles.yAxis}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey={activeFilter}
                    stroke="#1b85f3"
                    strokeWidth={2}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </>
          ) : (
            <Typography variant="body">No statistics</Typography>
          )}
        </div>
      </Card>
    </div>
  );
}

export default memo(DeviceStatistics);
