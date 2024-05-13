import { memo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import _minBy from 'lodash/minBy';
import _maxBy from 'lodash/maxBy';

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

  console.log({ deviceStatistics });

  const handleRssiFilter = () => {
    setActiveFilter('rssi');
  };

  const handleHeapUsageFilter = () => {
    setActiveFilter('heapUsage');
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
                <Typography variant="note">
                  Statistics by {activeFilter}
                </Typography>
                <Button
                  variant="outline"
                  color="grey_200"
                  size="small"
                  onClick={handleRssiFilter}
                >
                  Rssi
                </Button>
                <Button
                  variant="outline"
                  color="grey_200"
                  size="small"
                  onClick={handleHeapUsageFilter}
                >
                  Heap usage
                </Button>
              </div>
              <ResponsiveContainer width="100%" height="100%" maxHeight={500}>
                .
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
                  <Legend />
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
