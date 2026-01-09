import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CountDownProps {
  id?: string;
  until: number; // seconds
  onFinish?: () => void;
  digitStyle?: ViewStyle;
  digitTxtStyle?: TextStyle;
  timeToShow?: ('D' | 'H' | 'M' | 'S')[];
  timeLabels?: { d?: string; h?: string; m?: string; s?: string };
  showSeparator?: boolean;
}

const CountDown: React.FC<CountDownProps> = ({
  until,
  onFinish,
  digitStyle,
  digitTxtStyle,
  timeToShow = ['M', 'S'],
  timeLabels,
  showSeparator = false,
}) => {
  const [timeLeft, setTimeLeft] = useState(until);
  const intervalRef = useRef<number | null>(null);
  const onFinishRef = useRef(onFinish);
  const hasFinishedRef = useRef(false);

  // Keep onFinish ref up to date
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  // Handle countdown completion
  useEffect(() => {
    if (timeLeft === 0 && !hasFinishedRef.current && onFinishRef.current) {
      hasFinishedRef.current = true;
      // Use setTimeout to defer the callback to after render
      setTimeout(() => {
        onFinishRef.current?.();
      }, 0);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Reset finished flag when until changes
    hasFinishedRef.current = false;

    // Start the countdown
    setTimeLeft(until);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [until]);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return {
      D: days,
      H: hours,
      M: minutes,
      S: secs,
    };
  };

  const renderDigit = (value: number, label?: string) => {
    const formattedValue = String(value).padStart(2, '0');
    return (
      <View key={label || formattedValue} style={[styles.digitContainer, digitStyle]}>
        <Text style={[styles.digitText, digitTxtStyle]}>{formattedValue}</Text>
        {label && (
          <Text style={styles.labelText}>{label}</Text>
        )}
      </View>
    );
  };

  const time = formatTime(timeLeft);
  const separator = showSeparator ? ':' : ' ';

  return (
    <View style={styles.container}>
      {timeToShow.map((unit, index) => {
        const value = time[unit];
        const label = timeLabels?.[unit.toLowerCase() as 'd' | 'h' | 'm' | 's'];
        return (
          <React.Fragment key={unit}>
            {renderDigit(value, label)}
            {index < timeToShow.length - 1 && (
              <Text style={[styles.separator, digitTxtStyle]}>{separator}</Text>
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  digitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 30,
  },
  digitText: {
    fontSize: 16,
    fontWeight: '500',
  },
  labelText: {
    fontSize: 10,
    marginTop: 2,
  },
  separator: {
    marginHorizontal: 2,
  },
});

export default CountDown;
