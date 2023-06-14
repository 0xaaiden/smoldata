import React from 'react';

function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(`${(R * (100 + percent)) / 100}`, 10);
    G = parseInt(`${(G * (100 + percent)) / 100}`, 10);
    B = parseInt(`${(B * (100 + percent)) / 100}`, 10);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    const RR = R.toString(16).length === 1 ? `0${R.toString(16)}` : R.toString(16);
    const GG = G.toString(16).length === 1 ? `0${G.toString(16)}` : G.toString(16);
    const BB = B.toString(16).length === 1 ? `0${B.toString(16)}` : B.toString(16);

    return `#${RR}${GG}${BB}`;
}

const DEFAULT_RADIUS = 60;
const MAX_VALUE = 10;

const Direction = {
    CLOCKSWISE: -1,
    ANTI_CLOCKWISE: 1,
};

type Props = {
    maxValue?: number,
    selectedValue?: number,
    radius?: number,
    strokeWidth?: number,
    label?: string,
    activeStrokeColor?: string,
    inactiveStrokeColor?: string,
    labelFontSize?: number,
    valueFontSize?: number,
    withGradient?: boolean,
    anticlockwise?: boolean,
    initialAngularDisplacement?: number,
    backgroundColor?: string,
    textColor?: string,
};

const CircularProgressBar = ({
    maxValue,
    selectedValue,
    radius,
    strokeWidth,
    label,
    activeStrokeColor,
    inactiveStrokeColor,
    backgroundColor,
    textColor,
    labelFontSize,
    valueFontSize,
    withGradient,
    anticlockwise,
    initialAngularDisplacement,
}: Props) => {
    // ----  PIE calculation funciton --------
    const generatePie = (value) => {
        const x = radius - Math.cos((2 * Math.PI) / (100 / value)) * radius;
        const y = radius + Math.sin((2 * Math.PI) / (100 / value)) * radius;
        const long = value <= 50 ? 0 : 1;
        const d = `M${radius} ${radius} L${radius} ${0} A${radius} ${radius} 0 ${long} 1 ${y} ${x} Z`;

        return d;
    };

    // ----  PIE Area calculation  --------
    const calculatePieValue = (numberOfBars) => {
        const angle = 360 / numberOfBars;
        const pieValue = Math.floor(angle / 4);
        return pieValue < 1 ? 1 : Math.floor(angle / 4);
    };

    // ----  PIE render funciton --------
    const renderPie = (i) => {
        const DIRECTION = anticlockwise ? Direction.ANTI_CLOCKWISE : Direction.CLOCKSWISE;
        // Rotation Calculation
        const primaryRotationAngle = (maxValue - 1) * (360 / maxValue);
        const rotationAngle = DIRECTION * initialAngularDisplacement
            + -1 * DIRECTION * primaryRotationAngle
            + i * DIRECTION * primaryRotationAngle;
        const rotationTransformation = `rotate(${rotationAngle}, ${radius}, ${radius})`;

        const pieValue = calculatePieValue(maxValue);
        const dValue = generatePie(pieValue);

        const activeColor = withGradient
            ? shadeColor(activeStrokeColor, ((i + 1) * maxValue) / 50)
            : activeStrokeColor;

        const fillColor = selectedValue > 0 && i <= selectedValue
            ? activeColor : inactiveStrokeColor;

        return (
            <path
                style={{ opacity: i === 0 ? 0 : 1 }}
                key={i}
                d={dValue}
                fill={fillColor}
                transform={rotationTransformation}
            />
        );
    };

    // ----  Creates a circle by combining the Pie(s) --------
    const renderOuterCircle = () => [...Array(maxValue + 1)].map((e, i) => renderPie(i));

    const labelView = (
        <text
            fill={textColor}
            fontSize={labelFontSize}
            x={radius}
            y={radius + labelFontSize}
            textAnchor="middle"
        >
            {label}
        </text>
    );

    const textValueY = label ? radius : radius + valueFontSize / 3;

    // --------  MAIN Render --------
    return (
        <svg width={radius * 2} height={radius * 2}>
            {renderOuterCircle()}

            {/* This is the overlay circle */}
            <circle r={radius - strokeWidth} cx={radius} cy={radius} fill={backgroundColor} />

            <text
                fill={textColor}
                fontSize={valueFontSize}
                fontWeight="bold"
                x={radius}
                y={textValueY}
                textAnchor="middle"
            >
                {selectedValue}
            </text>
            {!!label.length && labelView}
        </svg>
    );
};

CircularProgressBar.defaultProps = {
    maxValue: MAX_VALUE,
    selectedValue: 0,
    radius: DEFAULT_RADIUS,
    strokeWidth: DEFAULT_RADIUS / 10,
    label: '',
    activeStrokeColor: '#05a168',
    inactiveStrokeColor: '#ddd',
    backgroundColor: '#fff',
    textColor: '#000',
    labelFontSize: Math.floor(DEFAULT_RADIUS / 3),
    valueFontSize: Math.floor(DEFAULT_RADIUS / 2.5),
    withGradient: false,
    anticlockwise: false,
    initialAngularDisplacement: 0,
};

export default CircularProgressBar;