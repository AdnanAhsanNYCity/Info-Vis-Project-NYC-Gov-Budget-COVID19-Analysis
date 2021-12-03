import define1 from "./a33468b95d0b15b0@808.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Analysis of the NYC's Government Pandemic-related Spending during the COVID-19 Pandemic - Adnan Ahsan FINAL`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Introduction`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
We hope to analyze the changes to the NYC Government Budget Spending during the COVID-19 Pandemic to discover any trends or surprising spending adjustments due to the crisis and to present that into an easy to understand format. It is interesting to us to discover the impact a modern day pandemic would have on a modern day city. We hear about plagues devastating ancient empires or even as close as a hundred years ago, such as the Antonine Plague during the Roman Empire or the Spanish Flu in 1920. However today we have significant record keeping and data collection to understand how such plagues would of affected metropolises. We hope to understand which departments are most negatively or even positively affected by the pandemic in terms of budget and which departments would have surprising upheavals in their budgets. This would illustrate to us which departments are the most essential to the city during a time of crisis and help future city planners and city governments prepare for future pandemics. In addition it would give us insight into past history and help historians understand the affects that pandemics had on past societies.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Dataset`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
The data we are using comes from New York City Open Data, an independent open source data platform of all things NYC from government data to traffic 311 data. It is a table of the daily budget spending on pandemic related expenses in dollars per day for each department in the NYC Governemnt from the start of the Pandemic in March. Here is a link to it below:

https://data.cityofnewyork.us/dataset/Independent-Budget-Office-NYC-COVID-19-Spending-by/ke6f-vhnd

And a table with the data below:`
)});
  main.variable(observer("url")).define("url", function(){return(
"https://data.cityofnewyork.us/resource/ke6f-vhnd.json"
)});
  main.variable(observer("budget")).define("budget", ["d3","url"], async function(d3,url){return(
(await d3.json(url)).map(d => {
  // automatically convert the strings to numbers
  const obj = d3.autoType(d);
  // remove the dollar sign at the front and remove the commas
  obj['district_attorney_bronx_county'] = +obj['district_attorney_bronx_county'].slice(1).replace(/,/g, '');
  obj['independent_budget_office'] = +obj['independent_budget_office'].slice(1).replace(/,/g, '');
  obj['law_department'] = +obj['law_department'].slice(1).replace(/,/g, '');
  
  return obj;
})
)});
  main.variable(observer("columns")).define("columns", ["budget"], function(budget){return(
Object.keys(budget[0]).slice(1)
)});
  main.variable(observer()).define(["Inputs","budget"], function(Inputs,budget){return(
Inputs.table(budget)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Questions`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`

1. How did the City's Department's pandemic-related spending change throughout the pandemic?

2. Are there any Departments that had significant funding over the rest and if so why?

3. Are there any outlier days/weeks/months of department budgets that had significant spending throughout the pandemic and if so, why?

4. How did the overall city budget change throughout the pandemic?

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## 1. How did the City's Department's pandemic-related spending change throughout the pandemic?`
)});
  main.variable(observer()).define(["md"], function(md){return(
md ` In order to get a sense of the city's spending during the pandemic, we have to look at each department to visualize and notice any spending trends. To do this, I've compiled a heatmap below that shows the pandemic spending for each department per month with the ability to pick and choose which departments to show using the interactive legend. `
)});
  main.variable(observer()).define(["legend","heatColor"], function(legend,heatColor){return(
legend({
  color: heatColor,
  title: 'Spending'
})
)});
  main.variable(observer("viewof monthselections")).define("viewof monthselections", ["d3","sorteddepartments","color_scale"], function(d3,sorteddepartments,color_scale)
{
  const rowHeight = 20;
  const fontSize = 15;

  const svg = d3.create('svg')
      .attr('width', 300)
      // origins is an array containing the strings USA, Europe, and Japan
      .attr('height', rowHeight * sorteddepartments.length + 5);

  const rows = svg.selectAll('g')
    .data(sorteddepartments)
    .join('g')
      // position the group for each row of the legend
      .attr('transform', (d, i) => `translate(5, ${i * rowHeight + 5})`);

  // add colored square to each row
  rows.append('rect')
      .attr('width', fontSize)
      .attr('height', fontSize)
      .attr('stroke-width', 2)
      .attr('stroke', d => color_scale(d))
      .attr('fill', d => color_scale(d))
      .on('click', onclick);

  // add label to each row
  rows.append('text')
      .attr('font-size', fontSize)
      .attr('x', rowHeight)
      .attr('y', fontSize / 2)
      .attr('font-family', 'sans-serif')
      .attr('dominant-baseline', 'middle')
      .text(d => d);

  // Track which origins are selected in the legend.
  // This is a map from car origin to a boolean for
  // whether or not it the origin is selected.
  // To start, all origins are selected.
  const selected = new Map(sorteddepartments.map(d => [d, true]));

  function onclick(event, d) {
    const isSelected = selected.get(d);

    // this refers to the square that was clicked
    const square = d3.select(this);
    // toggle the square
    square.attr('fill', d => isSelected ? 'white' : color_scale(d));
    selected.set(d, !isSelected);
    
    svg.property('value', selected).dispatch('input');
  }
  
  svg.property('value', selected).dispatch('input');

  return svg.node();
}
);
  main.variable(observer("monthselections")).define("monthselections", ["Generators", "viewof monthselections"], (G, _) => G.input(_));
  main.variable(observer()).define(["heatChartmonths","heatColormonths"], function(heatChartmonths,heatColormonths){return(
heatChartmonths(heatColormonths)
)});
  main.variable(observer()).define(["md"], function(md){return(
md `Here we see significant difference in spending throughout the pandemic with a noticeable increase in spending around the March, April, May, and June months among the top five departments in the heatmap. And we do see a sort of "Peaks and Valleys" effect with departments, for example the Department of Homeless had a sort of peak during the month of September 2020 to January 2021. In another example we see the Department of Information taper off into a valley during the first four months of the dataset. Overall we do see spending pick up in the second half of the heatmap, toward 2021. 

However given we have a by the month view of spending we can't extrapolate specific weeks or days and pinpoint the reasons why this spending occured. So we will drill down to a by the week view in our new heatmap below`
)});
  main.variable(observer()).define(["legend","heatColor"], function(legend,heatColor){return(
legend({
  color: heatColor,
  title: 'Spending'
})
)});
  main.variable(observer("viewof weekselections")).define("viewof weekselections", ["d3","sorteddepartments","color_scale"], function(d3,sorteddepartments,color_scale)
{
  const rowHeight = 20;
  const fontSize = 15;

  const svg = d3.create('svg')
      .attr('width', 300)
      // origins is an array containing the strings USA, Europe, and Japan
      .attr('height', rowHeight * sorteddepartments.length + 5);

  const rows = svg.selectAll('g')
    .data(sorteddepartments)
    .join('g')
      // position the group for each row of the legend
      .attr('transform', (d, i) => `translate(5, ${i * rowHeight + 5})`);

  // add colored square to each row
  rows.append('rect')
      .attr('width', fontSize)
      .attr('height', fontSize)
      .attr('stroke-width', 2)
      .attr('stroke', d => color_scale(d))
      .attr('fill', d => color_scale(d))
      .on('click', onclick);

  // add label to each row
  rows.append('text')
      .attr('font-size', fontSize)
      .attr('x', rowHeight)
      .attr('y', fontSize / 2)
      .attr('font-family', 'sans-serif')
      .attr('dominant-baseline', 'middle')
      .text(d => d);

  // Track which origins are selected in the legend.
  // This is a map from car origin to a boolean for
  // whether or not it the origin is selected.
  // To start, all origins are selected.
  const selected = new Map(sorteddepartments.map(d => [d, true]));

  function onclick(event, d) {
    const isSelected = selected.get(d);

    // this refers to the square that was clicked
    const square = d3.select(this);
    // toggle the square
    square.attr('fill', d => isSelected ? 'white' : color_scale(d));
    selected.set(d, !isSelected);
    
    svg.property('value', selected).dispatch('input');
  }
  
  svg.property('value', selected).dispatch('input');

  return svg.node();
}
);
  main.variable(observer("weekselections")).define("weekselections", ["Generators", "viewof weekselections"], (G, _) => G.input(_));
  main.variable(observer()).define(["heatChartweeks","heatColorweek"], function(heatChartweeks,heatColorweek){return(
heatChartweeks(heatColorweek)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`From this view, we can get a better understanding of which weeks most of this montly spending occured. For example in the second half of the heatmap we can see what specific weeks the spending picked up during the months of March, April, May, and June in 2021. And that even among those heavy spending months there are peaks and valleys. We can also see some departments in specific weeks have outliers in terms of spending or other departments such as education with a rapidly fluctuating but consistently present spending.

However even with a weekly data view, we would still have a hard time pinpointing what caused such increases or decreases in spending and would have a better time with a by the day view, so we can extrapolate exact news that explains spending phenomenon. Below, we have a by the day view.`
)});
  main.variable(observer()).define(["legend","heatColor"], function(legend,heatColor){return(
legend({
  color: heatColor,
  title: 'Spending'
})
)});
  main.variable(observer("viewof dayselections")).define("viewof dayselections", ["d3","sorteddepartments","color_scale"], function(d3,sorteddepartments,color_scale)
{
  const rowHeight = 20;
  const fontSize = 15;

  const svg = d3.create('svg')
      .attr('width', 300)
      // origins is an array containing the strings USA, Europe, and Japan
      .attr('height', rowHeight * sorteddepartments.length + 5);

  const rows = svg.selectAll('g')
    .data(sorteddepartments)
    .join('g')
      // position the group for each row of the legend
      .attr('transform', (d, i) => `translate(5, ${i * rowHeight + 5})`);

  // add colored square to each row
  rows.append('rect')
      .attr('width', fontSize)
      .attr('height', fontSize)
      .attr('stroke-width', 2)
      .attr('stroke', d => color_scale(d))
      .attr('fill', d => color_scale(d))
      .on('click', onclick);

  // add label to each row
  rows.append('text')
      .attr('font-size', fontSize)
      .attr('x', rowHeight)
      .attr('y', fontSize / 2)
      .attr('font-family', 'sans-serif')
      .attr('dominant-baseline', 'middle')
      .text(d => d);

  // Track which origins are selected in the legend.
  // This is a map from car origin to a boolean for
  // whether or not it the origin is selected.
  // To start, all origins are selected.
  const selected = new Map(sorteddepartments.map(d => [d, true]));

  function onclick(event, d) {
    const isSelected = selected.get(d);

    // this refers to the square that was clicked
    const square = d3.select(this);
    // toggle the square
    square.attr('fill', d => isSelected ? 'white' : color_scale(d));
    selected.set(d, !isSelected);
    
    svg.property('value', selected).dispatch('input');
  }
  
  svg.property('value', selected).dispatch('input');

  return svg.node();
}
);
  main.variable(observer("dayselections")).define("dayselections", ["Generators", "viewof dayselections"], (G, _) => G.input(_));
  main.variable(observer()).define(["heatChartdays","heatColor"], function(heatChartdays,heatColor){return(
heatChartdays(heatColor)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Here, we can see the exact days that had significant amounts of spending per department and if those collection of days are speaks or valleys themselves. We can also look at the news cycle to explain any outliers or spending trends for the city's departments. Now that we can visualize how spending has changed over the pandemic for each deparment, we can take a look at outliers or which departments did most of the spending come from, we do this below`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## 2. Are there any Departments that had significant funding over the rest and if so why?`
)});
  main.variable(observer()).define(["md"], function(md){return(
md` We want to focus on the departments that spent the most during the pandemic. This will give insight as to which departments in a city during a pandemic uses the most funding, allowing future city planners and budgeters to plan accordingly. Below we have the top five departments with the most pandemic related spending.`
)});
  main.variable(observer()).define(["legend","heatColor"], function(legend,heatColor){return(
legend({
  color: heatColor,
  title: 'Spending'
})
)});
  main.variable(observer("viewof selections")).define("viewof selections", ["d3","uniquedeptop5","color_scale"], function(d3,uniquedeptop5,color_scale)
{
  const rowHeight = 20;
  const fontSize = 15;

  const svg = d3.create('svg')
      .attr('width', 300)
      // origins is an array containing the strings USA, Europe, and Japan
      .attr('height', rowHeight * uniquedeptop5.length + 5);

  const rows = svg.selectAll('g')
    .data(uniquedeptop5)
    .join('g')
      // position the group for each row of the legend
      .attr('transform', (d, i) => `translate(5, ${i * rowHeight + 5})`);

  // add colored square to each row
  rows.append('rect')
      .attr('width', fontSize)
      .attr('height', fontSize)
      .attr('stroke-width', 2)
      .attr('stroke', d => color_scale(d))
      .attr('fill', d => color_scale(d))
      .on('click', onclick);

  // add label to each row
  rows.append('text')
      .attr('font-size', fontSize)
      .attr('x', rowHeight)
      .attr('y', fontSize / 2)
      .attr('font-family', 'sans-serif')
      .attr('dominant-baseline', 'middle')
      .text(d => d);

  // Track which origins are selected in the legend.
  // This is a map from car origin to a boolean for
  // whether or not it the origin is selected.
  // To start, all origins are selected.
  const selected = new Map(uniquedeptop5.map(d => [d, true]));

  function onclick(event, d) {
    const isSelected = selected.get(d);

    // this refers to the square that was clicked
    const square = d3.select(this);
    // toggle the square
    square.attr('fill', d => isSelected ? 'white' : color_scale(d));
    selected.set(d, !isSelected);
    
    svg.property('value', selected).dispatch('input');
  }
  
  svg.property('value', selected).dispatch('input');

  return svg.node();
}
);
  main.variable(observer("selections")).define("selections", ["Generators", "viewof selections"], (G, _) => G.input(_));
  main.variable(observer()).define(["heatChartmonthstop5","color"], function(heatChartmonthstop5,color){return(
heatChartmonthstop5(color)
)});
  main.variable(observer()).define(["md"], function(md){return(
md` We see that the Departments of Sanitation, Homeless, Emergency, Health and Human Services, and Information spent the most during the pandemic. For the Sanitation Department, it makes sense given the changes throughout the city related to sanitizing mass transit, public areas, and government buildings. For the Emergency Emergency we would see an outsize spending given to the emergency deparment considering the crisis of the Pandemic. In the Homeless Department we saw significant layoffs and an uptick in homelessness leading to the city expanding their services and thus spending more for it.  In the Department of Health and Human Services, one of the forefronts of the city's fight against the Pandemic, we would certainly see the most spending commited to likely setting up testing sights, PSA's, as well as eventual vaccaintion centers. And finally the Department of Information would be pivotal in relaying Pandemic-related knowledge to the denizens of the city.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Links to dated news articles with context `
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.nytimes.com/2021/04/16/nyregion/shelter-workers-homelessness.html`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://abc7ny.com/delta-variant-covid-nyc-new-york-city-vaccines-campaign/10919669/`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.nytimes.com/2020/09/28/nyregion/nyc-budget-coronavirus.html`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
However we do see a few trends of significant spending such as from October 2020 to Janruary 2021 for the Department of Sanitation and the months from March 2020 to June 2021 for the top five deparments. Why specifcally did this happen? To answer this, we can dril down to their weekly view and give context through the news. Below is the top five deparments by the week. `
)});
  main.variable(observer()).define(["legend","heatColor"], function(legend,heatColor){return(
legend({
  color: heatColor,
  title: 'Spending'
})
)});
  main.variable(observer("viewof selectionsweek")).define("viewof selectionsweek", ["d3","uniquedeptop5","color_scale"], function(d3,uniquedeptop5,color_scale)
{
  const rowHeight = 20;
  const fontSize = 15;

  const svg = d3.create('svg')
      .attr('width', 300)
      // origins is an array containing the strings USA, Europe, and Japan
      .attr('height', rowHeight * uniquedeptop5.length + 5);

  const rows = svg.selectAll('g')
    .data(uniquedeptop5)
    .join('g')
      // position the group for each row of the legend
      .attr('transform', (d, i) => `translate(5, ${i * rowHeight + 5})`);

  // add colored square to each row
  rows.append('rect')
      .attr('width', fontSize)
      .attr('height', fontSize)
      .attr('stroke-width', 2)
      .attr('stroke', d => color_scale(d))
      .attr('fill', d => color_scale(d))
      .on('click', onclick);

  // add label to each row
  rows.append('text')
      .attr('font-size', fontSize)
      .attr('x', rowHeight)
      .attr('y', fontSize / 2)
      .attr('font-family', 'sans-serif')
      .attr('dominant-baseline', 'middle')
      .text(d => d);

  // Track which origins are selected in the legend.
  // This is a map from car origin to a boolean for
  // whether or not it the origin is selected.
  // To start, all origins are selected.
  const selected = new Map(uniquedeptop5.map(d => [d, true]));

  function onclick(event, d) {
    const isSelected = selected.get(d);

    // this refers to the square that was clicked
    const square = d3.select(this);
    // toggle the square
    square.attr('fill', d => isSelected ? 'white' : color_scale(d));
    selected.set(d, !isSelected);
    
    svg.property('value', selected).dispatch('input');
  }
  
  svg.property('value', selected).dispatch('input');

  return svg.node();
}
);
  main.variable(observer("selectionsweek")).define("selectionsweek", ["Generators", "viewof selectionsweek"], (G, _) => G.input(_));
  main.variable(observer()).define(["heatChartweekstop5","color"], function(heatChartweekstop5,color){return(
heatChartweekstop5(color)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Now that we have drilled down to a week view, we can see specific weeks which had the most spending and understand it through the news at the time. 

In the Department of Santiation, we see an increase in spending from the week of September 14 all the way to the week Novemeber 23. Coincidentally during that time period, the 2020 election and the campaigning season, while tempered due to Pandemic restrictions, likely caused an increase in the spending of the Department of Sanitation to prep and clean poll sites.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.nytimes.com/2020/10/27/nyregion/nyc-early-voting-election.html`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `Starting in the week of March 08 and continuing for the rest of the dataset, we see significant upticks in spending in the Department of Information, Health, and Emergency. This too coincided with the public release of the COVID-19 Vaccine, likely causing these departments to spend significant amounts to prep vaccination sites, combat disinformation through ad campaigns as well as informing the public. For emergency it is likely with the opening of many public and private venues due to the vaccine, we see an increase in emergency spending given most denizens are slowly returning back to public life.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.nytimes.com/2021/06/15/nyregion/coronavirus-restrictions.html`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.ft.com/content/d03500ae-0baf-4035-bbae-c55f59337fe5`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## 3. Are there any outlier days/weeks/months of department budgets that had significant spending throughout the pandemic and if so, why?`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Now that we have a sense of what weeks, departments, and what reason cost the city so much in spending, we must also consider outliers to see if they are part of a larger trend or isolated incidents. For future city officials facing another pandemic, it would be useful for them to know of any unexpected expenditures that could come up any time.

Below is the by the week view of the heatmap.`
)});
  main.variable(observer()).define(["legend","heatColor"], function(legend,heatColor){return(
legend({
  color: heatColor,
  title: 'Spending'
})
)});
  main.variable(observer("viewof weekselections2")).define("viewof weekselections2", ["d3","sorteddepartments","color_scale"], function(d3,sorteddepartments,color_scale)
{
  const rowHeight = 20;
  const fontSize = 15;

  const svg = d3.create('svg')
      .attr('width', 300)
      // origins is an array containing the strings USA, Europe, and Japan
      .attr('height', rowHeight * sorteddepartments.length + 5);

  const rows = svg.selectAll('g')
    .data(sorteddepartments)
    .join('g')
      // position the group for each row of the legend
      .attr('transform', (d, i) => `translate(5, ${i * rowHeight + 5})`);

  // add colored square to each row
  rows.append('rect')
      .attr('width', fontSize)
      .attr('height', fontSize)
      .attr('stroke-width', 2)
      .attr('stroke', d => color_scale(d))
      .attr('fill', d => color_scale(d))
      .on('click', onclick);

  // add label to each row
  rows.append('text')
      .attr('font-size', fontSize)
      .attr('x', rowHeight)
      .attr('y', fontSize / 2)
      .attr('font-family', 'sans-serif')
      .attr('dominant-baseline', 'middle')
      .text(d => d);

  // Track which origins are selected in the legend.
  // This is a map from car origin to a boolean for
  // whether or not it the origin is selected.
  // To start, all origins are selected.
  const selected = new Map(sorteddepartments.map(d => [d, true]));

  function onclick(event, d) {
    const isSelected = selected.get(d);

    // this refers to the square that was clicked
    const square = d3.select(this);
    // toggle the square
    square.attr('fill', d => isSelected ? 'white' : color_scale(d));
    selected.set(d, !isSelected);
    
    svg.property('value', selected).dispatch('input');
  }
  
  svg.property('value', selected).dispatch('input');

  return svg.node();
}
);
  main.variable(observer("weekselections2")).define("weekselections2", ["Generators", "viewof weekselections2"], (G, _) => G.input(_));
  main.variable(observer()).define(["heatChartweeks2","heatColorweek"], function(heatChartweeks2,heatColorweek){return(
heatChartweeks2(heatColorweek)
)});
  main.variable(observer()).define(["md"], function(md){return(
md` We can see some key department spending outliers in the by the week heatmap. These are listed below:

1. Department of Emergency        (Week of September 8th, 2021)
2. Department of Education        (Week of July 6th, 2020)
3. Department of Design           (Week of May 11th, 2020)
4. Department of Small Buisness   (Week of May 4th, 2020)
5. Department of Social Services  (Week of February 1st, 2021)

In addition we see on during the week of July 27th a significant spending increase throughout several departments.

Comparing the dates to the news cycle within the city at the time we learn that: 
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`In the spike for the Deparment of Emergency we see articles on recent crime and new covid cases during that second week of September. For the Department of Education we see news articles that describe the city taking measures to reopen schools or provide alternatives in the second week of July. For the Department of Design we see several articles on public NYC buildings having to deal with coronavirus such as hospitals and plans for creating testing sites. For Small Businesses, we see a spike in aid given in the height of the pandemic to stave off bankruptcy for owners. And finally for the Department of Social Services, a large increase in spending as we see news articles of NYC preparing for the winter.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.nytimes.com/issue/todaysheadlines/2020/09/08/todays-headlines`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.nytimes.com/issue/todaysheadlines/2020/07/07/todays-headlines`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.nytimes.com/issue/todaysheadlines/2020/05/13/todays-headlines`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.nytimes.com/2021/06/30/nyregion/nyc-budget-covid.html`
)});
  main.variable(observer()).define(["md"], function(md){return(
md` And lastly for the week of Aug 3rd where we saw a burst of spending across several departments such as emergency, social services, and health among others, from news at the time we discover  Hurricane Isaias hit that same week, likely contributing to the uptick in spending.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.nytimes.com/2020/08/04/nyregion/isaias-ny.html`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `## 4. How did the overall city budget change over time?`
)});
  main.variable(observer()).define(["md"], function(md){return(
md` After discovering the departments that spent the most and outliers, we wish to see the overall city spending budget throughout the pandemic and so we have a line chart below. It seems that during the Spring of 2021, likely when most New Yorkers started to get vaccinated and go out we see a steady upward trend in spending by the city.`
)});
  main.variable(observer()).define(["d3","visWidth","margin","visHeight","xline","yline","line","citywidebudget"], function(d3,visWidth,margin,visHeight,xline,yline,line,citywidebudget)
{
  const svg = d3.create('svg')
      .attr('width', visWidth + margin.left + margin.right)
      .attr('height', visHeight + margin.top + margin.bottom + 100);
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top+50})`);
  
  const xAxisline = d3.axisBottom(xline)
    .tickFormat(d3.timeFormat('%b %y')); 
  
  const yAxisline = d3.axisLeft(yline);
  
  g.append('g')
      .attr('transform', `translate(0,${visHeight})`)
      .call(xAxisline);
  
  g.append('g')
      .call(yAxisline)
      .call(g => g.select('.domain').remove())
    .append('text')
      .attr('fill', 'black')
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'hanging')
      .attr('font-weight', 'bold')
      .attr('y', -margin.top-15)
      .attr('x', -margin.left)
      .text('Budget Spending Amount');
  

  g.append('path')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('d', line(citywidebudget));
  
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md `# Conclusion`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
  From the data trends we visualized and gathered we can draw a few takeaways. It seems that for New York City during a pandemic the sanitary, economic, emergency, and health situations are where most of the pandemic-related spending goes into. For example, the largest amounts of pandemic-related spending were on departments focused on direct aid  and action for people such as the Department of Homeless, the Department of Sanitation etc. In addition we find that the days where pandemic-related spending increased the most were not on days primarily focused on the pandemic but when outside events exacerbated spending making outlier data points. For example events like Hurricane Isaiah or the drawn out Democratic Mayoral Primary that strained the city’s budget. In addition we see  areas of the city government such as the Department of Education or the Department of Homeless that saw massive increases in school shutdowns and homelessness respectively, likely incurring the city’s response. And finally, we saw that as vaccines rollout, lockdowns started to end, and the pandemic started to taper off, New York City saw a significant increase in spending across all deparments as people returned somewhat to their pre-pandemic lives. This likely spurred the city to spend more to make itself liveable under the pandemic. With this knowledge, City Budget planners should prepare accordingly for when the next pandemic comes. `
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Appendix`
)});
  main.variable(observer("budgetsum")).define("budgetsum", ["d3","budget","columns"], function(d3,budget,columns){return(
d3.rollup(
  budget,
  // get the sum for each column
  v => columns.map(col => ({
    dept: col,
    amount: d3.sum(v, d => d[col])
  })),
  // group by month
  d => d3.timeMonth(d.date)
)
)});
  main.variable(observer("budgetsumarray")).define("budgetsumarray", ["budgetsum"], function(budgetsum){return(
[...budgetsum.values()]
)});
  main.variable(observer("totalbudget")).define("totalbudget", ["budgetsumarray"], function(budgetsumarray){return(
budgetsumarray.flat()
)});
  main.variable(observer("totalbudgetsumrollup")).define("totalbudgetsumrollup", ["d3","totalbudget"], function(d3,totalbudget){return(
d3.rollups(
    totalbudget,
    a => d3.sum(a, a => a.amount),
    d => d.dept
)
)});
  main.variable(observer("totalbudgetunlabeled")).define("totalbudgetunlabeled", ["totalbudgetsumrollup","d3"], function(totalbudgetsumrollup,d3){return(
totalbudgetsumrollup.filter(d => d.dept !== "citywide").sort((a,b) =>-d3.descending(a[1],b[1])).slice(0,45)
)});
  main.variable(observer("totalbudgetlabeled")).define("totalbudgetlabeled", ["totalbudgetunlabeled"], function(totalbudgetunlabeled){return(
totalbudgetunlabeled.map(([dept, amount]) => ({
    dept: dept,
    amount: amount
  }))
)});
  main.variable(observer("sorteddepartments")).define("sorteddepartments", ["totalbudgetlabeled"], function(totalbudgetlabeled){return(
totalbudgetlabeled.map(d => d.dept).slice(25,45)
)});
  main.variable(observer("startofpandemic")).define("startofpandemic", ["budgetsumarray"], function(budgetsumarray){return(
budgetsumarray[0]
)});
  main.variable(observer("topstart")).define("topstart", ["startofpandemic","d3"], function(startofpandemic,d3){return(
startofpandemic.sort((a,b) =>d3.ascending(a.amount,b.amount)).filter(d => d.dept !== "citywide").slice(0,45)
)});
  main.variable(observer("total")).define("total", ["startofpandemic","d3"], function(startofpandemic,d3){return(
startofpandemic.sort((a,b) =>d3.descending(a.amount,b.amount)).filter(d => d.dept !== "department_of_citywide" && d.dept !== "citywide").slice(0,45)
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 10, bottom: 45, left: 150, right: 10}
)});
  main.variable(observer("totalWidth")).define("totalWidth", ["width"], function(width){return(
width
)});
  main.variable(observer("totalHeight")).define("totalHeight", function(){return(
600
)});
  main.variable(observer("visWidth")).define("visWidth", ["width","margin"], function(width,margin){return(
width - margin.left - margin.right
)});
  main.variable(observer("visHeight")).define("visHeight", ["totalHeight","margin"], function(totalHeight,margin){return(
totalHeight - margin.top - margin.bottom
)});
  main.variable(observer("maxamount")).define("maxamount", ["d3","topstart"], function(d3,topstart){return(
d3.max(topstart,  d => d.amount)
)});
  main.variable(observer("departmentssorted")).define("departmentssorted", ["topstart"], function(topstart){return(
topstart.map(d => d.dept).slice(0,20)
)});
  main.variable(observer("color")).define("color", ["d3","departmentssorted"], function(d3,departmentssorted){return(
d3.scaleOrdinal()
  .domain(departmentssorted)
  .range(d3.schemeTableau10)
)});
  main.variable(observer("budgetlastmonth")).define("budgetlastmonth", ["budgetsumarray"], function(budgetsumarray){return(
budgetsumarray[15]
)});
  main.variable(observer("departmentnames")).define("departmentnames", ["topstart"], function(topstart){return(
topstart.map(d => d.dept)
)});
  main.variable(observer("colorchange")).define("colorchange", ["d3","total"], function(d3,total){return(
d3.scaleOrdinal()
  .domain(total)
  .range(d3.schemeTableau10)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`###  Line Chart Over Time Code `
)});
  main.variable(observer("citywidebudget")).define("citywidebudget", ["d3","budget"], function(d3,budget)
{
  const counts = d3.rollup(budget,
        c => d3.sum(c, c => c.citywide),
        d => d3.timeMonth(d.date));
  
  return Array.from(counts, (([date, count]) => ({
    date: new Date(date),
    budget: count
  })));
}
);
  main.variable(observer("xline")).define("xline", ["d3","citywidebudget","visWidth"], function(d3,citywidebudget,visWidth){return(
d3.scaleTime()
      .domain(d3.extent(citywidebudget, d => d.date))
      .range([0, visWidth])
)});
  main.variable(observer("yline")).define("yline", ["d3","citywidebudget","visHeight"], function(d3,citywidebudget,visHeight){return(
d3.scaleLinear()
      .domain([0, d3.max(citywidebudget, d => d.budget)]).nice()
      .range([visHeight, 0])
)});
  main.variable(observer("line")).define("line", ["d3","xline","yline"], function(d3,xline,yline){return(
d3.line()
    .x(d => xline(d.date))
    .y(d => yline(d.budget))
)});
  main.variable(observer()).define(["line","citywidebudget"], function(line,citywidebudget){return(
line(citywidebudget)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`##  Heat Map Code `
)});
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  main.import("swatches", child1);
  main.variable(observer()).define(["md"], function(md){return(
md`###  Daily Heatmap Code `
)});
  main.variable(observer("day")).define("day", ["budget","columns"], function(budget,columns){return(
budget.map(row => columns.map(col => ({
  dept: col,
  amount: row[col],
  date: row.date
}))).flat()
)});
  main.variable(observer("daydatesunsorted")).define("daydatesunsorted", ["day"], function(day){return(
day.map(d => d.date)
)});
  main.variable(observer("daydates")).define("daydates", ["daydatesunsorted"], function(daydatesunsorted){return(
Array.from(new Set(daydatesunsorted))
)});
  main.variable(observer()).define(["departmentnames"], function(departmentnames){return(
departmentnames
)});
  main.variable(observer("mindaydate")).define("mindaydate", ["daydates"], function(daydates){return(
daydates[0]
)});
  main.variable(observer("maxdaydate")).define("maxdaydate", ["daydates"], function(daydates){return(
daydates[342]
)});
  main.variable(observer("maxdayamount")).define("maxdayamount", ["d3","day"], function(d3,day){return(
d3.max(day, d => d.amount)
)});
  main.variable(observer("heatChartdays")).define("heatChartdays", ["d3","DOM","visWidth","margin","visHeight","height","xAxisscaleday","y_scale","dataday","dayselections","x_scale_days","color_scale"], function(d3,DOM,visWidth,margin,visHeight,height,xAxisscaleday,y_scale,dataday,dayselections,x_scale_days,color_scale){return(
function heatChartdays(color) {
  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);


  
  
  g.append('g')
    .attr('transform', 'translate(0,' +  height +')')
    .call(xAxisscaleday)
  .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start")
  g.append('g')
    .call(d3.axisLeft(y_scale))
  
  // squares
  g.selectAll('square')
    .data(dataday.filter(d => dayselections.get(d.dept)))
    .join('rect')
      .attr('class', '.square')
      .attr('x', d => x_scale_days(d.date))
      .attr('y', d => y_scale(d.dept))
      .attr('width', x_scale_days.bandwidth())
      .attr('height', y_scale.bandwidth())
      .attr('fill', d => color_scale(d.amount))
      .attr('pointer-events', 'none')

  const backgrounds = g.append('g');
  
  const gap = y_scale.step() * y_scale.padding();
  
  backgrounds.selectAll('rect')
    .data(y_scale.domain())
    .join('rect')
      .attr('x', 0)
      .attr('y', d => y_scale(d) - gap)
      .attr('width', visWidth)
      .attr('height', y_scale.step() + gap)
      .attr('fill', d3.color("rgba(98, 98, 89, 0.01)"))
      .on('mouseenter', function(event, d) {
        d3.select(this)
            .raise()
            .attr('fill', d3.color("rgba(234, 253, 111, 0.3)"));
      })
      .on('mouseleave', function mouseLeave(event, d) {
        d3.select(this)
            .attr('fill', d3.color("rgba(98, 98, 89, 0.01)"));
      });
  
  return svg.node();
}
)});
  main.variable(observer("heatColor")).define("heatColor", ["d3","maxdayamount"], function(d3,maxdayamount){return(
d3.scaleSequential()
    .domain([0, maxdayamount])
    .interpolator(d3.interpolateGreens)
)});
  main.variable(observer("x_scale_days")).define("x_scale_days", ["d3","daydates","visWidth"], function(d3,daydates,visWidth){return(
d3.scaleBand()
  .domain(daydates)
  .range([0, visWidth])
)});
  main.variable(observer("y_scale")).define("y_scale", ["d3","sorteddepartments","height"], function(d3,sorteddepartments,height){return(
d3.scaleBand()
  .domain(sorteddepartments)
  .range([height, 0])
)});
  main.variable(observer("xAxisscaleday")).define("xAxisscaleday", ["d3","x_scale_days"], function(d3,x_scale_days){return(
d3.axisBottom(x_scale_days).tickFormat(d3.timeFormat("%b %d")).tickValues(x_scale_days.domain().filter(function(d,i){ return !(i%4)}))
)});
  main.variable(observer("sanitationday")).define("sanitationday", ["day"], function(day){return(
day.filter(d => d.dept === "department_of_sanitation")
)});
  main.variable(observer("homelessday")).define("homelessday", ["day"], function(day){return(
day.filter(d => d.dept === "department_of_homeless")
)});
  main.variable(observer("emergencyday")).define("emergencyday", ["day"], function(day){return(
day.filter(d => d.dept === "department_of_emergency")
)});
  main.variable(observer("healthday")).define("healthday", ["day"], function(day){return(
day.filter(d => d.dept === "department_of_health_and")
)});
  main.variable(observer("informationday")).define("informationday", ["day"], function(day){return(
day.filter(d => d.dept === "department_of_information")
)});
  main.variable(observer("educationday")).define("educationday", ["day"], function(day){return(
day.filter(d => d.dept === "department_of_education")
)});
  main.variable(observer("designday")).define("designday", ["day"], function(day){return(
day.filter(d => d.dept === "department_of_design_and")
)});
  main.variable(observer("smallday")).define("smallday", ["day"], function(day){return(
day.filter(d => d.dept === "department_of_small_business")
)});
  main.variable(observer("socialday")).define("socialday", ["day"], function(day){return(
day.filter(d => d.dept === "department_of_social_services")
)});
  main.variable(observer("fireday")).define("fireday", ["day"], function(day){return(
day.filter(d => d.dept === "fire_department")
)});
  main.variable(observer("miscellaneousday")).define("miscellaneousday", ["day"], function(day){return(
day.filter(d => d.dept === "miscellaneous")
)});
  main.variable(observer("transportationday")).define("transportationday", ["day"], function(day){return(
day.filter(d => d.dept === "department_of_transportation")
)});
  main.variable(observer("buildingsday")).define("buildingsday", ["day"], function(day){return(
day.filter(d => d.dept === "department_of_buildings")
)});
  main.variable(observer("policeday")).define("policeday", ["day"], function(day){return(
day.filter(d => d.dept === "police_department")
)});
  main.variable(observer("agingday")).define("agingday", ["day"], function(day){return(
day.filter(d => d.dept === "department_for_the_aging")
)});
  main.variable(observer("environmentalday")).define("environmentalday", ["day"], function(day){return(
day.filter(d => d.dept === "department_of_environmental")
)});
  main.variable(observer("correctionday")).define("correctionday", ["day"], function(day){return(
day.filter(d => d.dept === "department_of_correction")
)});
  main.variable(observer("electionsday")).define("electionsday", ["day"], function(day){return(
day.filter(d => d.dept === "board_of_elections")
)});
  main.variable(observer("childday")).define("childday", ["day"], function(day){return(
day.filter(d => d.dept === "administration_for_child")
)});
  main.variable(observer("parksday")).define("parksday", ["day"], function(day){return(
day.filter(d => d.dept === "department_of_parks_and")
)});
  main.variable(observer("datamergeday")).define("datamergeday", ["sanitationday","healthday","homelessday","emergencyday","informationday","educationday","designday","smallday","socialday","miscellaneousday","policeday","transportationday","buildingsday","agingday","environmentalday","correctionday","electionsday","childday","parksday","fireday","d3"], function(sanitationday,healthday,homelessday,emergencyday,informationday,educationday,designday,smallday,socialday,miscellaneousday,policeday,transportationday,buildingsday,agingday,environmentalday,correctionday,electionsday,childday,parksday,fireday,d3)
{
  const input = [sanitationday, healthday, homelessday, emergencyday, informationday, educationday, designday, smallday, socialday, miscellaneousday, policeday, transportationday, buildingsday, agingday, environmentalday, correctionday, electionsday, childday, parksday, fireday];
  d3.merge(input);
  return input; 
}
);
  main.variable(observer("dataday")).define("dataday", ["datamergeday"], function(datamergeday){return(
datamergeday.flat()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`###  Weekly Heatmap Code `
)});
  main.variable(observer("week")).define("week", ["d3","budget","columns"], function(d3,budget,columns){return(
d3.rollups(
  budget,
  // get the sum for each column
  v => columns.map(col => ({
    dept: col,
    amount: d3.sum(v, d => d[col]),
    date: v[0].date
  })),
  // group by month
  d => d3.timeWeek(d.date)
).map(d => d[1]).flat()
)});
  main.variable(observer("datamergeweek")).define("datamergeweek", ["sanitationweek","healthweek","homelessweek","emergencyweek","informationweek","educationweek","designweek","smallweek","socialweek","miscellaneousweek","policeweek","transportationweek","buildingsweek","agingweek","environmentweek","correctionweek","electionsweek","childweek","parkweek","fireweek","d3"], function(sanitationweek,healthweek,homelessweek,emergencyweek,informationweek,educationweek,designweek,smallweek,socialweek,miscellaneousweek,policeweek,transportationweek,buildingsweek,agingweek,environmentweek,correctionweek,electionsweek,childweek,parkweek,fireweek,d3)
{
  const input = [sanitationweek, healthweek, homelessweek, emergencyweek, informationweek, educationweek, designweek, smallweek, socialweek, miscellaneousweek, policeweek, transportationweek, buildingsweek, agingweek, environmentweek, correctionweek, electionsweek, childweek, parkweek, fireweek];
  d3.merge(input);
  return input; 
}
);
  main.variable(observer("dataweek")).define("dataweek", ["datamergeweek"], function(datamergeweek){return(
datamergeweek.flat()
)});
  main.variable(observer("weekdatesroll")).define("weekdatesroll", ["d3","week"], function(d3,week){return(
d3.rollups(week, 
                           a => d3.sum( a, a => a.amount),
                           d => d.date
                        )
)});
  main.variable(observer("weekdatesunsorted")).define("weekdatesunsorted", ["week"], function(week){return(
week.map(d => d.date)
)});
  main.variable(observer("weekdates")).define("weekdates", ["d3","weekdatesroll"], function(d3,weekdatesroll){return(
d3.range(weekdatesroll.length)
)});
  main.variable(observer("weeknumbers")).define("weeknumbers", ["weekdates"], function(weekdates){return(
Array.from(new Set(weekdates))
)});
  main.variable(observer("weeks")).define("weeks", ["weekdatesunsorted"], function(weekdatesunsorted){return(
Array.from(new Set(weekdatesunsorted))
)});
  main.variable(observer("minweekdate")).define("minweekdate", ["weekdates"], function(weekdates){return(
weekdates[0]
)});
  main.variable(observer("maxweekdate")).define("maxweekdate", ["weekdates"], function(weekdates){return(
weekdates[65]
)});
  main.variable(observer("maxweekamount")).define("maxweekamount", ["d3","week"], function(d3,week){return(
d3.max(week, d => d.amount)
)});
  main.variable(observer("x_scale_week")).define("x_scale_week", ["d3","weeks","visWidth"], function(d3,weeks,visWidth){return(
d3.scaleBand()
  .domain(weeks)
  .range([0, visWidth])
)});
  main.variable(observer("heatColorweek")).define("heatColorweek", ["d3","maxweekamount"], function(d3,maxweekamount){return(
d3.scaleSequential()
    .domain([0, maxweekamount])
    .interpolator(d3.interpolateGreens)
)});
  main.variable(observer("height")).define("height", function(){return(
500
)});
  main.variable(observer("color_scale")).define("color_scale", ["d3","maxamount"], function(d3,maxamount){return(
d3.scaleLinear()
  .domain([0, maxamount])
  .range(['lightgrey', 'green'])
)});
  main.variable(observer("xAxisscale")).define("xAxisscale", ["d3","x_scale_week"], function(d3,x_scale_week){return(
d3.axisBottom(x_scale_week).tickFormat(d3.timeFormat("%b %d"))
)});
  main.variable(observer("heatChartweeks")).define("heatChartweeks", ["d3","DOM","visWidth","margin","visHeight","height","xAxisscale","y_scale","dataweek","weekselections","x_scale_week","color_scale"], function(d3,DOM,visWidth,margin,visHeight,height,xAxisscale,y_scale,dataweek,weekselections,x_scale_week,color_scale){return(
function heatChartweeks(color) {
  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);


  
  g.append('g')
    .attr('transform', 'translate(0,' +  height +')')
    .call(xAxisscale)
  .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start")
  
  g.append('g')
    .call(d3.axisLeft(y_scale))
  
  // squares
  g.selectAll('square')
    .data(dataweek.filter(d => weekselections.get(d.dept)))
    .join('rect')
      .attr('class', '.square')
      .attr('x', d => x_scale_week(d.date))
      .attr('y', d => y_scale(d.dept))
      .attr('width', x_scale_week.bandwidth())
      .attr('height', y_scale.bandwidth())
      .attr('fill', d => color_scale(d.amount))
      .attr('pointer-events', 'none')

  const backgrounds = g.append('g');
  
  const gap = y_scale.step() * y_scale.padding();
  
  backgrounds.selectAll('rect')
    .data(y_scale.domain())
    .join('rect')
      .attr('x', 0)
      .attr('y', d => y_scale(d) - gap)
      .attr('width', visWidth)
      .attr('height', y_scale.step() + gap)
      .attr('fill', d3.color("rgba(98, 98, 89, 0.01)"))
      .on('mouseenter', function(event, d) {
        d3.select(this)
            .raise()
            .attr('fill', d3.color("rgba(234, 253, 111, 0.3)"));
      })
      .on('mouseleave', function mouseLeave(event, d) {
        d3.select(this)
            .attr('fill', d3.color("rgba(98, 98, 89, 0.01)"));
      });
  
  return svg.node();
}
)});
  main.variable(observer("heatChartweeks2")).define("heatChartweeks2", ["d3","DOM","visWidth","margin","visHeight","height","xAxisscale","y_scale","dataweek","weekselections2","x_scale_week","color_scale"], function(d3,DOM,visWidth,margin,visHeight,height,xAxisscale,y_scale,dataweek,weekselections2,x_scale_week,color_scale){return(
function heatChartweeks2(color) {
  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);


  
  g.append('g')
    .attr('transform', 'translate(0,' +  height +')')
    .call(xAxisscale)
  .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start")
  
  g.append('g')
    .call(d3.axisLeft(y_scale))
  
  // squares
  g.selectAll('square')
    .data(dataweek.filter(d => weekselections2.get(d.dept)))
    .join('rect')
      .attr('class', '.square')
      .attr('x', d => x_scale_week(d.date))
      .attr('y', d => y_scale(d.dept))
      .attr('width', x_scale_week.bandwidth())
      .attr('height', y_scale.bandwidth())
      .attr('fill', d => color_scale(d.amount))
      .attr('pointer-events', 'none')

  const backgrounds = g.append('g');
  
  const gap = y_scale.step() * y_scale.padding();
  
  backgrounds.selectAll('rect')
    .data(y_scale.domain())
    .join('rect')
      .attr('x', 0)
      .attr('y', d => y_scale(d) - gap)
      .attr('width', visWidth)
      .attr('height', y_scale.step() + gap)
      .attr('fill', d3.color("rgba(98, 98, 89, 0.01)"))
      .on('mouseenter', function(event, d) {
        d3.select(this)
            .raise()
            .attr('fill', d3.color("rgba(234, 253, 111, 0.3)"));
      })
      .on('mouseleave', function mouseLeave(event, d) {
        d3.select(this)
            .attr('fill', d3.color("rgba(98, 98, 89, 0.01)"));
      });
  
  return svg.node();
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`###  Monthly Heatmap Code `
)});
  main.variable(observer("month")).define("month", ["d3","budget","columns"], function(d3,budget,columns){return(
d3.rollups(
  budget,
  // get the sum for each column
  v => columns.map(col => ({
    dept: col,
    amount: d3.sum(v, d => d[col]),
    date: v[0].date
  })),
  // group by month
  d => d3.timeMonth(d.date)
).map(d => d[1]).flat()
)});
  main.variable(observer("monthsum")).define("monthsum", ["d3","month"], function(d3,month){return(
d3.rollups(
  month,
  a => d3.sum(a, a => a.amount),
  d => d.dept
)
)});
  main.variable(observer("monthdatesunsorted")).define("monthdatesunsorted", ["month"], function(month){return(
month.map(d => d.date)
)});
  main.variable(observer("minmonthdate")).define("minmonthdate", ["months"], function(months){return(
months[0]
)});
  main.variable(observer("maxmonthdate")).define("maxmonthdate", ["months"], function(months){return(
months[15]
)});
  main.variable(observer("maxmonthamount")).define("maxmonthamount", ["d3","month"], function(d3,month){return(
d3.max(month, d => d.amount)
)});
  main.variable(observer("months")).define("months", ["monthdatesunsorted"], function(monthdatesunsorted){return(
Array.from(new Set(monthdatesunsorted))
)});
  main.variable(observer("x_scale_month")).define("x_scale_month", ["d3","months","visWidth"], function(d3,months,visWidth){return(
d3.scaleBand()
  .domain(months)
  .range([0, visWidth])
)});
  main.variable(observer("heatChartmonths")).define("heatChartmonths", ["d3","DOM","visWidth","margin","visHeight","height","xAxismonth","y_scale","datatotal","monthselections","x_scale_month","color_scale"], function(d3,DOM,visWidth,margin,visHeight,height,xAxismonth,y_scale,datatotal,monthselections,x_scale_month,color_scale){return(
function heatChartmonths(color) {
  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  

  g.append('g')
    .attr('transform', 'translate(0,' +  height +')')
    .call(xAxismonth)
  g.append('g')
    .call(d3.axisLeft(y_scale))
  
  g.selectAll('square')
    .data(datatotal.filter(d => monthselections.get(d.dept)))
    .join('rect')
      .attr('class', '.square')
      .attr('x', d => x_scale_month(d.date))
      .attr('y', d => y_scale(d.dept))
      .attr('width', x_scale_month.bandwidth())
      .attr('height', y_scale.bandwidth())
      .attr('fill', d => color_scale(d.amount))
      .attr('pointer-events', 'none')

  const backgrounds = g.append('g');
  
  const gap = y_scale.step() * y_scale.padding();
  
  backgrounds.selectAll('rect')
    .data(y_scale.domain())
    .join('rect')
      .attr('x', 0)
      .attr('y', d => y_scale(d) - gap)
      .attr('width', visWidth)
      .attr('height', y_scale.step() + gap)
      .attr('fill', d3.color("rgba(98, 98, 89, 0.01)"))
      .on('mouseenter', function(event, d) {
        d3.select(this)
            .raise()
            .attr('fill', d3.color("rgba(234, 253, 111, 0.25)"));
      })
      .on('mouseleave', function mouseLeave(event, d) {
        d3.select(this)
            .attr('fill', d3.color("rgba(98, 98, 89, 0.01)"));
      });

  
  return svg.node();
}
)});
  main.variable(observer("heatColormonths")).define("heatColormonths", ["d3","maxmonthamount"], function(d3,maxmonthamount){return(
d3.scaleSequential()
    .domain([0, maxmonthamount])
    .interpolator(d3.interpolateGreens)
)});
  main.variable(observer("xAxismonth")).define("xAxismonth", ["d3","x_scale_month"], function(d3,x_scale_month){return(
d3.axisBottom(x_scale_month).tickFormat(d3.timeFormat("%B"))
)});
  main.variable(observer("datamerge")).define("datamerge", ["sanitation","health","homeless","emergency","information","education","design","small","social","fire","miscellaneous","transportation","buildings","police","aging","environment","correction","elections","child","parks","d3"], function(sanitation,health,homeless,emergency,information,education,design,small,social,fire,miscellaneous,transportation,buildings,police,aging,environment,correction,elections,child,parks,d3)
{
  const input = [sanitation, health, homeless, emergency, information, education, design, small, social, fire, miscellaneous, transportation, buildings, police, aging, environment, correction, elections, child, parks];
  d3.merge(input);
  return input; 
}
);
  main.variable(observer("departmentnamesmonth")).define("departmentnamesmonth", ["datatotal"], function(datatotal){return(
datatotal.map(d => d.dept)
)});
  main.variable(observer("uniquedeptmonthset")).define("uniquedeptmonthset", ["departmentnamesmonth"], function(departmentnamesmonth){return(
new Set(departmentnamesmonth)
)});
  main.variable(observer("uniquedeptmonth")).define("uniquedeptmonth", ["uniquedeptmonthset"], function(uniquedeptmonthset){return(
Array.from(uniquedeptmonthset)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`###  Top 5 Dept Heatmap Month `
)});
  main.variable(observer("topdepartments")).define("topdepartments", ["sorteddepartments"], function(sorteddepartments){return(
sorteddepartments.slice(15,20)
)});
  main.variable(observer("y_scale_top")).define("y_scale_top", ["d3","topdepartments","height"], function(d3,topdepartments,height){return(
d3.scaleBand()
  .domain(topdepartments)
  .range([height, 0])
)});
  main.variable(observer("sanitation")).define("sanitation", ["month"], function(month){return(
month.filter(d => d.dept === "department_of_sanitation")
)});
  main.variable(observer("health")).define("health", ["month"], function(month){return(
month.filter(d => d.dept === "department_of_health_and")
)});
  main.variable(observer("homeless")).define("homeless", ["month"], function(month){return(
month.filter(d => d.dept === "department_of_homeless")
)});
  main.variable(observer("emergency")).define("emergency", ["month"], function(month){return(
month.filter(d => d.dept === "department_of_emergency")
)});
  main.variable(observer("information")).define("information", ["month"], function(month){return(
month.filter(d => d.dept === "department_of_information")
)});
  main.variable(observer("education")).define("education", ["month"], function(month){return(
month.filter(d => d.dept === "department_of_education")
)});
  main.variable(observer("design")).define("design", ["month"], function(month){return(
month.filter(d => d.dept === "department_of_design_and")
)});
  main.variable(observer("small")).define("small", ["month"], function(month){return(
month.filter(d => d.dept === "department_of_small_business")
)});
  main.variable(observer("social")).define("social", ["month"], function(month){return(
month.filter(d => d.dept === "department_of_social_services")
)});
  main.variable(observer("fire")).define("fire", ["month"], function(month){return(
month.filter(d => d.dept === "fire_department")
)});
  main.variable(observer("miscellaneous")).define("miscellaneous", ["month"], function(month){return(
month.filter(d => d.dept === "miscellaneous")
)});
  main.variable(observer("transportation")).define("transportation", ["month"], function(month){return(
month.filter(d => d.dept === "department_of_transportation")
)});
  main.variable(observer("buildings")).define("buildings", ["month"], function(month){return(
month.filter(d => d.dept === "department_of_buildings")
)});
  main.variable(observer("police")).define("police", ["month"], function(month){return(
month.filter(d => d.dept === "police_department")
)});
  main.variable(observer("aging")).define("aging", ["month"], function(month){return(
month.filter(d => d.dept === "department_for_the_aging")
)});
  main.variable(observer("environment")).define("environment", ["month"], function(month){return(
month.filter(d => d.dept === "department_of_environmental")
)});
  main.variable(observer("correction")).define("correction", ["month"], function(month){return(
month.filter(d => d.dept === "department_of_correction")
)});
  main.variable(observer("elections")).define("elections", ["month"], function(month){return(
month.filter(d => d.dept === "board_of_elections")
)});
  main.variable(observer("child")).define("child", ["month"], function(month){return(
month.filter(d => d.dept === "administration_for_child")
)});
  main.variable(observer("parks")).define("parks", ["month"], function(month){return(
month.filter(d => d.dept === "department_of_parks_and")
)});
  main.variable(observer("datatotal")).define("datatotal", ["datamerge"], function(datamerge){return(
datamerge.flat()
)});
  main.variable(observer("datamerge5")).define("datamerge5", ["sanitation","health","homeless","emergency","information","d3"], function(sanitation,health,homeless,emergency,information,d3)
{
  const input = [sanitation, health, homeless, emergency, information];
  d3.merge(input);
  return input; 
}
);
  main.variable(observer("top5")).define("top5", ["datamerge5"], function(datamerge5){return(
datamerge5.flat()
)});
  main.variable(observer("departmentnamestop5")).define("departmentnamestop5", ["top5"], function(top5){return(
top5.map(d => d.dept)
)});
  main.variable(observer("uniquedeptop5set")).define("uniquedeptop5set", ["departmentnamestop5"], function(departmentnamestop5){return(
new Set(departmentnamestop5)
)});
  main.variable(observer("uniquedeptop5")).define("uniquedeptop5", ["uniquedeptop5set"], function(uniquedeptop5set){return(
Array.from(uniquedeptop5set)
)});
  main.variable(observer("heatChartmonthstop5")).define("heatChartmonthstop5", ["d3","DOM","visWidth","margin","visHeight","height","xAxismonth","y_scale_top","top5","selections","x_scale_month","color_scale","y_scale"], function(d3,DOM,visWidth,margin,visHeight,height,xAxismonth,y_scale_top,top5,selections,x_scale_month,color_scale,y_scale){return(
function heatChartmonthstop5(color) {
  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  

  g.append('g')
    .attr('transform', 'translate(0,' +  height +')')
    .call(xAxismonth)
  g.append('g')
    .call(d3.axisLeft(y_scale_top))
  
  // squares
  g.selectAll('square')
    .data(top5.filter(d => selections.get(d.dept)))
    .join('rect')
      .attr('class', '.square')
      .attr('x', d => x_scale_month(d.date))
      .attr('y', d => y_scale_top(d.dept))
      .attr('width', x_scale_month.bandwidth())
      .attr('height', y_scale_top.bandwidth())
      .attr('fill', d => color_scale(d.amount))
      .attr('pointer-events', 'none')

  const backgrounds = g.append('g');
  
  const gap = y_scale_top.step() * y_scale_top.padding();
  
  backgrounds.selectAll('rect')
    .data(y_scale.domain())
    .join('rect')
      .attr('x', 0)
      .attr('y', d => y_scale_top(d) - gap)
      .attr('width', visWidth)
      .attr('height', y_scale_top.step() + gap)
      .attr('fill', d3.color("rgba(98, 98, 89, 0.01)"))
      .on('mouseenter', function(event, d) {
        d3.select(this)
            .raise()
            .attr('fill', d3.color("rgba(234, 253, 111, 0.3)"));
      })
      .on('mouseleave', function mouseLeave(event, d) {
        d3.select(this)
            .attr('fill', d3.color("rgba(98, 98, 89, 0.01)"));
      });

  
  return svg.node();
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`###  Top 5 Dept Heatmap Week `
)});
  main.variable(observer("sanitationweek")).define("sanitationweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_of_sanitation")
)});
  main.variable(observer("healthweek")).define("healthweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_of_health_and")
)});
  main.variable(observer("homelessweek")).define("homelessweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_of_homeless")
)});
  main.variable(observer("emergencyweek")).define("emergencyweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_of_emergency")
)});
  main.variable(observer("informationweek")).define("informationweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_of_information")
)});
  main.variable(observer("educationweek")).define("educationweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_of_education")
)});
  main.variable(observer("designweek")).define("designweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_of_design_and")
)});
  main.variable(observer("smallweek")).define("smallweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_of_small_business")
)});
  main.variable(observer("socialweek")).define("socialweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_of_social_services")
)});
  main.variable(observer("fireweek")).define("fireweek", ["week"], function(week){return(
week.filter(d => d.dept === "fire_department")
)});
  main.variable(observer("miscellaneousweek")).define("miscellaneousweek", ["week"], function(week){return(
week.filter(d => d.dept === "miscellaneous")
)});
  main.variable(observer("transportationweek")).define("transportationweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_of_transportation")
)});
  main.variable(observer("buildingsweek")).define("buildingsweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_of_buildings")
)});
  main.variable(observer("policeweek")).define("policeweek", ["week"], function(week){return(
week.filter(d => d.dept === "police_department")
)});
  main.variable(observer("agingweek")).define("agingweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_for_the_aging")
)});
  main.variable(observer("environmentweek")).define("environmentweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_of_environmental")
)});
  main.variable(observer("correctionweek")).define("correctionweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_of_correction")
)});
  main.variable(observer("electionsweek")).define("electionsweek", ["week"], function(week){return(
week.filter(d => d.dept === "board_of_elections")
)});
  main.variable(observer("childweek")).define("childweek", ["week"], function(week){return(
week.filter(d => d.dept === "administration_for_child")
)});
  main.variable(observer("parkweek")).define("parkweek", ["week"], function(week){return(
week.filter(d => d.dept === "department_of_parks_and")
)});
  main.variable(observer("datamerge5week")).define("datamerge5week", ["sanitationweek","healthweek","homelessweek","emergencyweek","informationweek","d3"], function(sanitationweek,healthweek,homelessweek,emergencyweek,informationweek,d3)
{
  const input = [sanitationweek, healthweek, homelessweek, emergencyweek, informationweek];
  d3.merge(input);
  return input; 
}
);
  main.variable(observer("top5week")).define("top5week", ["datamerge5week"], function(datamerge5week){return(
datamerge5week.flat()
)});
  main.variable(observer("heatChartweekstop5")).define("heatChartweekstop5", ["d3","DOM","visWidth","margin","visHeight","height","xAxisscale","y_scale_top","top5week","selectionsweek","x_scale_week","color_scale"], function(d3,DOM,visWidth,margin,visHeight,height,xAxisscale,y_scale_top,top5week,selectionsweek,x_scale_week,color_scale){return(
function heatChartweekstop5(color) {
  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  

  g.append('g')
    .attr('transform', 'translate(0,' +  height +')')
    .call(xAxisscale)
  .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start")
  g.append('g')
    .call(d3.axisLeft(y_scale_top))
  
  // squares
  g.selectAll('square')
    .data(top5week.filter(d => selectionsweek.get(d.dept)))
    .join('rect')
      .attr('class', '.square')
      .attr('x', d => x_scale_week(d.date))
      .attr('y', d => y_scale_top(d.dept))
      .attr('width', x_scale_week.bandwidth())
      .attr('height', y_scale_top.bandwidth())
      .attr('fill', d => color_scale(d.amount))
      .attr('pointer-events', 'none')

  const backgrounds = g.append('g');
  
  const gap = y_scale_top.step() * y_scale_top.padding();
  
  backgrounds.selectAll('rect')
    .data(y_scale_top.domain())
    .join('rect')
      .attr('x', 0)
      .attr('y', d => y_scale_top(d) - gap)
      .attr('width', visWidth)
      .attr('height', y_scale_top.step() + gap)
      .attr('fill', d3.color("rgba(98, 98, 89, 0.01)"))
      .on('mouseenter', function(event, d) {
        d3.select(this)
            .raise()
            .attr('fill', d3.color("rgba(234, 253, 111, 0.25)"));
      })
      .on('mouseleave', function mouseLeave(event, d) {
        d3.select(this)
            .attr('fill', d3.color("rgba(98, 98, 89, 0.01)"));
      });

  
  return svg.node();
}
)});
  return main;
}
