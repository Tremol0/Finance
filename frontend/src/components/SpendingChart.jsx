import { Box, useColorModeValue } from "@chakra-ui/react";
import { useState, useMemo } from "react";

/**
 * Props:
 *  - data: [{ month: 'Jan', value: 200 }, ...]
 *  - height, width (optional)
 */
const SpendingChart = ({ data = [], width = 420, height = 220 }) => {
  const [hover, setHover] = useState(null);
  const lineColor = useColorModeValue("#0B63FF", "#87CEFF");
  const axisColor = useColorModeValue("#E2E8F0", "#2D3748");
  const chartBg = useColorModeValue("#fff", "#07112a");
  const tooltipBg = useColorModeValue("gray.700", "whiteAlpha.900");
  const tooltipColor = useColorModeValue("white", "gray.900");

  const padding = { top: 20, right: 20, bottom: 40, left: 40 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const maxVal = Math.max(...values, 1);

  const left = padding.left;
  const top = padding.top;

  const points = useMemo(() => {
    return data.map((d, i) => {
      const x = left + (i / Math.max(1, data.length - 1)) * innerW;
      const percent = d.value / maxVal;
      const y = top + innerH - percent * innerH;
      return { x, y, ...d };
    });
  }, [data, innerH, innerW, maxVal, left, top]);

  // Build polyline path
  const pathD =
    points.length === 0
      ? ""
      : "M " + points.map((p) => `${p.x} ${p.y}`).join(" L ");

  // left axis ticks (100,75,50,25,0)
  const ticks = [1, 0.75, 0.5, 0.25, 0];

  return (
    <Box position="relative" w={`${width}px`} h={`${height + 24}px`}>
      <svg width={width} height={height}>
        {/* background */}
        <rect x="0" y="0" width={width} height={height} rx="8" fill={chartBg} />
        {/* left axis labels and horizontal grid */}
        {ticks.map((t, i) => {
          const y = padding.top + innerH - t * innerH;
          return (
            <g key={i}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                stroke={axisColor}
                strokeWidth={t === 0 ? 2 : 1}
                strokeOpacity={t === 0 ? 1 : 0.12}
              />
              <text
                x={padding.left - 8}
                y={y + 4}
                fontSize="11"
                fill={axisColor}
                textAnchor="end"
              >
                {Math.round(t * 100)}%
              </text>
            </g>
          );
        })}

        {/* x baseline */}
        <line
          x1={padding.left}
          x2={width - padding.right}
          y1={padding.top + innerH}
          y2={padding.top + innerH}
          stroke={axisColor}
          strokeWidth="2"
        />

        {/* months labels */}
        {points.map((p) => (
          <text
            key={p.month}
            x={p.x}
            y={padding.top + innerH + 22}
            fontSize="13"
            fill={axisColor}
            textAnchor="middle"
          >
            {p.month}
          </text>
        ))}

        {/* line path */}
        <path
          d={pathD}
          fill="none"
          stroke={lineColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* points */}
        {points.map((p, i) => (
          <g key={p.month}>
            <circle
              cx={p.x}
              cy={p.y}
              r={6}
              fill={lineColor}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            />
          </g>
        ))}
      </svg>

      {/* tooltip */}
      {hover !== null && points[hover] && (
        <Box
          position="absolute"
          left={`${points[hover].x + 6}px`}
          top={`${points[hover].y - 28}px`}
          bg={tooltipBg}
          color={tooltipColor}
          px={3}
          py={1}
          borderRadius="6px"
          fontSize="12px"
          boxShadow="md"
          transform="translateX(6px)"
        >
          ${points[hover].value}
        </Box>
      )}
    </Box>
  );
};

export default SpendingChart;
