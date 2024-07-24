<?php
add_shortcode('chart', 'chart_shortcode');

function chart_shortcode($attr)
{
	$attr = shortcode_atts(
		array(
			'type' => 'default',
		),
		$attr
	);
	$type = $attr['type'];

	switch ($type) {
		case 'bond':
			$output = <<<HTML
      <div class="shortcode-chart-container shortcode-chart-bond-container"></div>
      HTML;
			break;

		case 'stock':
			$price_title = __('Price (BGN)', 'monbat');
			$change_title = __("Today's Change", 'monbat');
			$open_title = __("Open", 'monbat');
			$year_title = __("1 Year Change", 'monbat');
			$data = get_option('_data_rss');
			$avg_price = $data['lastPrice'];
			$icon = $data['changePriceIcon'];
			$iconYear = 'stock-equal';
			$percent = $data['changePrice'];
			$open = $data['openPrice'] ?? '-';
			$data_transient = get_transient('stock_data_transient');

			if($data_transient) {

				$last_index = end($data_transient);
				$new_close = $last_index['close'];

				$one_year_ago = strtotime('-1 year', $last_index['timestamp']);
				$closest_data = null;
				$closest_diff = PHP_INT_MAX;

				foreach ($data_transient as $data) {
					$timestamp = $data['timestamp'];
					$diff = abs($one_year_ago - $timestamp);
					if ($diff < $closest_diff) {
						$closest_data = $data;
						$closest_diff = $diff;
					}
				}

				$old_close = $closest_data['close'];

				$percentage_change = pct_change($old_close, $new_close);

				if ($percentage_change > 0) {
					$iconYear = 'stock-up';
				} elseif ($percentage_change < 0) {
					$iconYear = 'stock-down';
				}
			}

			$output = <<<HTML
      <div class="chart-wrapper">
      <div class="share-card">
      <div class="item price"><span class="title">$price_title</span><span class="content">$avg_price</span></div>
      <div class="item today-change"><span class="title">$change_title</span><span class="content"><span class="icon $icon"></span><span class="text">$percent</span><span class="percent">%</span></span></div>
      <div class="item open"><span class="title">$open_title</span><span class="content">$open</span></div>
      <div class="item year-change"><span class="title">$year_title</span><span class="content"><span class="icon $iconYear"></span><span class="text">$percentage_change</span><span class="percent">%</span></span></div>
      </div>
      <div class="highcharts-stocktools-wrapper highcharts-bindings-container highcharts-bindings-wrapper">
       <div class="highcharts-menu-wrapper">
      <ul class="highcharts-stocktools-toolbar stocktools-toolbar">
        <li class="highcharts-indicators" title="Indicators">
        	<span class="highcharts-menu-item-btn"></span>
          <span class="highcharts-menu-item-title">Indicators</span>
        </li>
        <li class="highcharts-series-type-ohlc" title="Type change">
          <span class="highcharts-menu-item-btn"></span>
          <span class="highcharts-menu-item-title">Series type</span>
          <span class="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
          <ul class="highcharts-submenu-wrapper">
            <li class="highcharts-series-type-ohlc" title="OHLC">
              <span class="highcharts-menu-item-btn"></span>
              <span class="highcharts-menu-item-title">OHLC</span>
            </li>
            <li class="highcharts-series-type-line" title="Line">
              <span class="highcharts-menu-item-btn"></span>
              <span class="highcharts-menu-item-title">Line</span>
            </li>
            <li class="highcharts-series-type-candlestick" title="Candlestick">
              <span class="highcharts-menu-item-btn"></span>
              <span class="highcharts-menu-item-title">Candlestick</span>
            </li>
          </ul>
        </li>
      </ul>
      </div>
      </div>
      <div class="shortcode-chart-container shortcode-chart-stock-container"></div>
      </div>
      HTML;
			break;

		default:
			$output = <<<HTML
      <div class="shortcode-chart-container shortcode-chart-sofix-container"></div>
      HTML;
			break;
	}

	return $output;
}

add_shortcode('table', 'table_shortcode');

function table_shortcode($attr)
{
	$attr = shortcode_atts(
		array(
			'type' => 'default',
		),
		$attr
	);
	$type = $attr['type'];
	$from = __('From', 'monbat');
	$to = __('To', 'monbat');
	$export = __('Export', 'monbat');
	switch ($type) {
		case 'bond':
			$output = <<<HTML
      <div class="tables-container wp-block-table">
        <div class="row">
        <div class="date-pickers">
        <div class="input-wrapper">
        <label for="from-date">$from</label>
        <input type="text" readonly name="from-date" class="from-date">
        </div>
        <div class="input-wrapper">
        <label for="to-date">$to</label>
        <input type="text" readonly name="to-date" class="to-date">
        </div>
        </div>
        <button class="sk-btn sk-btn--primary export">$export</button>
        </div>
        <figure data-type="$type" class="wp-block-table is-style-initial-small"></figure>
      </div>
      HTML;
			break;

		case 'stock':
			$output = <<<HTML
       <div class="tables-container wp-block-table">
        <div class="row">
        <div class="date-pickers">
        <div class="input-wrapper">
        <label for="from-date">$from</label>
        <input type="text" readonly name="from-date" class="from-date">
        </div>
        <div class="input-wrapper">
        <label for="to-date">$to</label>
        <input type="text" readonly name="to-date" class="to-date">
        </div>
        </div>
        <button class="sk-btn sk-btn--primary export">$export</button>
        </div>
        <figure data-type="$type" class="wp-block-table is-style-initial-small"></figure>
      </div>
      HTML;
			break;

		default:
			$output = <<<HTML
        <div class="tables-container wp-block-table">
        <div class="row">
        <div class="date-pickers">
        <div class="input-wrapper">
        <label for="from-date">$from</label>
        <input type="text" readonly name="from-date" class="from-date">
        </div>
        <div class="input-wrapper">
        <label for="to-date">$to</label>
        <input type="text" readonly name="to-date" class="to-date">
        </div>
        </div>
        <button class="sk-btn sk-btn--primary export">$export</button>
        </div>
        <figure data-type="stock" class="wp-block-table is-style-initial-small"></figure>
      </div>
      HTML;
			break;
	}

	return $output;
}
