export enum RunningStyle {
  Nige,
  Senko,
  Sashi,
  Oikomi,
}

export enum DistanceType {
  Short,
  Mile,
  Middle,
  Long,
}

export enum GroundType {
  Turf,
  Dirt,
}

export enum CoursePhase {
  Start = 0,
  Middle,
  End,
  LastSpurt,
}

export enum GroundStatus {
  Good,
  SlightlyHeavy,
  Heavy,
  Bad,
}

export enum ProperRate {
  G = '1',
  F = '2',
  E = '3',
  D = '4',
  C = '5',
  B = '6',
  A = '7',
  S = '8',
}

const constant = {
  baseDistance: 2000,
  minSpeed: {
    minSpeedRate: 0.85,
    minSpeedGutsCoefSqrt: 200,
    minSpeedGutsCoef: 0.001,
  },
  startDash: {
    targetSpeedCoefficient: 0.85,
    startAccelAdd: 24,
  },
  targetSpeed: {
    baseTargetSpeedRandomMinusVal1: -0.65,
    baseTargetSpeedRandomMinusVal2: 5500,
    baseTargetSpeedRandomPlusVal1: 5500,
    baseTargetSpeedRandomLogCoefficient: 0.1,
    baseTargetSpeedRandomCoefficient: 0.01,
    targetSpeedCoefficient: {
      [RunningStyle.Nige]: {
        [CoursePhase.Start]: 1,
        [CoursePhase.Middle]: 0.98,
        [CoursePhase.End]: 0.98,
        [CoursePhase.LastSpurt]: 0.98,
      },
      [RunningStyle.Senko]: {
        [CoursePhase.Start]: 0.978,
        [CoursePhase.Middle]: 0.991,
        [CoursePhase.End]: 0.975,
        [CoursePhase.LastSpurt]: 0.975,
      },
      [RunningStyle.Sashi]: {
        [CoursePhase.Start]: 0.938,
        [CoursePhase.Middle]: 0.998,
        [CoursePhase.End]: 0.994,
        [CoursePhase.LastSpurt]: 0.994,
      },
      [RunningStyle.Oikomi]: {
        [CoursePhase.Start]: 0.931,
        [CoursePhase.Middle]: 1,
        [CoursePhase.End]: 1,
        [CoursePhase.LastSpurt]: 1,
      },
    },
    phaseEndBaseTargetSpeedCoef: 500,
    addSpeedParamCoef: 0.002,
    baseTargetSpeedCoef: 1.05,
    lastSpurtBaseTargetSpeedAddCoef: 0.01,
    lastSpurtTargetSpeedCoefSqrt: 500,
    upSlopeAddSpeedVal1: 200,
    downSlopeAddSpeedVal1: 0.3,
    downSlopeAddSpeedVal2: 10,
    firstBlockSlowStyles: [RunningStyle.Sashi, RunningStyle.Oikomi],
  },
  accel: {
    accelPhaseCoef: {
      [RunningStyle.Nige]: {
        [CoursePhase.Start]: 1,
        [CoursePhase.Middle]: 1,
        [CoursePhase.End]: 0.996,
        [CoursePhase.LastSpurt]: 0.996,
      },
      [RunningStyle.Senko]: {
        [CoursePhase.Start]: 0.985,
        [CoursePhase.Middle]: 1,
        [CoursePhase.End]: 0.996,
        [CoursePhase.LastSpurt]: 0.996,
      },
      [RunningStyle.Sashi]: {
        [CoursePhase.Start]: 0.975,
        [CoursePhase.Middle]: 1,
        [CoursePhase.End]: 1,
        [CoursePhase.LastSpurt]: 1,
      },
      [RunningStyle.Oikomi]: {
        [CoursePhase.Start]: 0.945,
        [CoursePhase.Middle]: 1,
        [CoursePhase.End]: 0.997,
        [CoursePhase.LastSpurt]: 0.997,
      },
    },
    accelPowCoef: 0.0006,
    accelPowCoefUpSlope: 0.0004,
    accelPowCoefSqrt: 500,
    startAccelAdd: 24,
    accelDecreaseCoef: {
      [CoursePhase.Start]: -1.2,
      [CoursePhase.Middle]: -0.8,
      [CoursePhase.End]: 1.2,
      [CoursePhase.LastSpurt]: 1.2,
    },
    accelDecreaseZeroHpCoef: -1.2,
  },
  hp: {
    hpInitialVal1: 0.8,
    hpMaxCoef: {
      [RunningStyle.Nige]: 0.95,
      [RunningStyle.Senko]: 0.89,
      [RunningStyle.Sashi]: 1.0,
      [RunningStyle.Oikomi]: 0.995,
    },
    hpDecBase: 20,
    hpDecRateBaseNormal: 1,
    hpDecRateBaseTemptation: 1.6,
    hpDecRateBasePositionKeepPaseDown: 0.6,
    hpDecRateMultiplyDownSlopeAccelMode: 0.4,
    speedGapParam1: 12,
    speedGapParam1Pow: 144,
    groundModifierMultiHpSub: {
      [GroundType.Turf]: {
        [GroundStatus.Good]: 1,
        [GroundStatus.SlightlyHeavy]: 1,
        [GroundStatus.Heavy]: 1.02,
        [GroundStatus.Bad]: 1.02,
      },
      [GroundType.Dirt]: {
        [GroundStatus.Good]: 1,
        [GroundStatus.SlightlyHeavy]: 1,
        [GroundStatus.Heavy]: 1.01,
        [GroundStatus.Bad]: 1.02,
      },
    },
    hpGutsBase: 1,
    hpGutsCoef: 200,
    hpGutsCoefSqrt: 600,
  },
  course: {
    distanceTargetSpeedCoefficient: 0.001,
    blockPortion: 1 / 24,
    distanceShort: { min: 0, max: 1400 },
    distanceMile: { min: 1401, max: 1800 },
    distanceMiddle: { min: 1801, max: 2400 },
    distanceLong: { min: 2401, max: Number.MAX_VALUE },
    startSpeed: 3,
    phaseStart: 1 / 6,
    phaseMiddle: 4 / 6,
    phaseEnd: 5 / 6,
    positionSense: 10 / 24,
    frameTime: 1 / 15,
    gateTimeRange: { min: 0, max: 0.1 },
  },
};

export default constant;
