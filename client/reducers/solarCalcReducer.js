export const SOLAR_CALC_REQUEST = 'SOLAR_CALC_REQUEST';
export const SOLAR_CALC_SUCCESS = 'SOLAR_CALC_SUCCESS';
export const SOLAR_CALC_FAILURE = 'SOLAR_CALC_FAILURE';

export const initialSolarCalcState = {
  isRequesting: false,
  success: false,
  error: null,
  yearlyBillCostSolar: null,
  yearlyBillCostSolarAndRebate: null,
  avgYearlyBillsOver20Years: null,
  avgYearlyBillsWithSolarOver20years: null,
};

export const solarCalc = (state = initialSolarCalcState, action) => {
  switch (action.type) {
    case SOLAR_CALC_REQUEST:
      return {...state, isRequesting: true};
      case SOLAR_CALC_SUCCESS:
      return {
          ...state,
          isRequesting: false,
          success: true,
          solarIsBetter: action.result.solar_calc_outcomes.solar_is_better,
          yearlyBillSavings: action.result.solar_calc_outcomes.yearly_savings,
          yearsToPayoff: action.result.solar_calc_outcomes.years_to_payoff,
          estimateSystemCost: action.result.solar_calc_outcomes.estimate_system_cost,
          estimateSystemCostWithRebate: action.result.solar_calc_outcomes.estimate_system_cost_with_rebate,
          avgYearlyBillsOver15Years: action.result.solar_calc_outcomes.avg_yearly_bill_over_15_years,
          avgYearlyBillsWithSolarOver15years: action.result.solar_calc_outcomes.avg_yearly_bill_with_solar_over_15_years,
          increaseInHomeValue: action.result.solar_calc_outcomes.increase_in_home_value,
          co2Displaced: action.result.solar_calc_outcomes.co2_displaced,
      };
    case SOLAR_CALC_FAILURE:
      return {...state, isRequesting: false, success: false, error: action.error || 'unknown error'};
    default:
      return state;
  }
};

// Actions
export const newSolarCalc = ({formatted_address, place_id, address, location_lat, location_lng, address_components, roof_area, roof_lat_lng}) => (
    {
        type: SOLAR_CALC_REQUEST,
        formatted_address,
        place_id,
        address,
        location_lat,
        location_lng,
        address_components,
        roof_area,
        roof_lat_lng,
    }
);