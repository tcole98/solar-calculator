from server import db, models


def create_new_solar_calc_results(roof_area_estimation, solar_is_better, yearly_savings, years_to_payoff, estimate_system_cost, estimate_system_cost_with_rebate, estimate_rebate, increase_in_home_value, co2_displaced):
    new_solar_calc_results = models.SolarCalcResults(
        solar_is_better=solar_is_better,
        yearly_savings=yearly_savings,
        years_to_payoff=years_to_payoff,
        estimate_system_cost=estimate_system_cost,
        estimate_system_cost_with_rebate=estimate_system_cost_with_rebate,
        estimate_rebate=estimate_rebate,
        increase_in_home_value=increase_in_home_value,
        co2_displaced=co2_displaced
    )

    new_solar_calc_results.roof_area_estimation = roof_area_estimation

    db.session.add(new_solar_calc_results)
    db.session.commit()

    return new_solar_calc_results
