<?php
/**
 * RSS Data feed and Cron Event
 */

class RSSData
{
	private $url;
	private $data;


	public function __construct($url)
	{
		$this->url = $url;
		$this->data = array();
	}

	public function get_data()
	{
		$xml = @file_get_contents($this->url);
		$rss = false;

		if ($xml !== false) {
			libxml_use_internal_errors(true);
			$rss = simplexml_load_string($xml);
		}

		if ($rss !== false) {
			$item = $rss->channel->item;
			$changePrice = (float)$item->children('bse', true)->chgPrice;
			$changePrice = round($changePrice, 2);
			$changePriceValue = $changePrice > 0 ? 1 : ($changePrice < 0 ? -1 : 0);
			$changePriceIcon = 'stock-equal';
			$lastPrice = (float)$item->children('bse', true)->lastPrice;
			$minPrice = (float)$item->children('bse', true)->minPrice;
			$date = (string)$item->children('bse', true)->asOf;

			if ($lastPrice == 0) {
				$lastPrice = (float)$item->children('bse', true)->last;
			}

			if ($changePriceValue > 0) {
				$changePriceIcon = 'stock-up';
			} elseif ($changePriceValue < 0) {
				$changePriceIcon = 'stock-down';
			}

			$this->data['currency'] = (string)$item->children('bse', true)->currency;
			$this->data['lastPrice'] = $lastPrice;
			$this->data['changePrice'] = $changePrice;
			$this->data['changePriceIcon'] = $changePriceIcon;
			$this->data['openPrice'] = $minPrice;
			$this->data['date'] = $date;
		}

		return $this->data;
	}
}

class TickerCron
{
	public function register_event()
	{
		if (!wp_next_scheduled('get_ticker_cron_event')) {
			wp_schedule_event(time(), 'hourly', 'get_ticker_cron_event');
		}
	}

	public function get_data_and_save()
	{
		$rss_url = 'http://rss.bse-sofia.bg/?page=IssuerShares';
		$rss_data = new RSSData($rss_url);
		$response = $rss_data->get_data();

		if (!empty($response)) {
			update_option('_data_rss', $response);
		}
	}
}

class StockPriceShortcode
{
	public function render($attr)
	{
		$attr = shortcode_atts(
			array(
				'type' => 'default',
			),
			$attr
		);

		$output = '';
		$data = get_option('_data_rss');
		$type = $attr['type'];
		$exchange_title = __('SHARE <strong>PERFORMANCE</strong>', 'monbat');
		$bottom_title = __('Data delayed at least 60 minutes as', 'monbat');
		$currency_title = __('PRICE', 'monbat');
		$currency = $data['currency'];
		$avg_price = $data['lastPrice'];
		$icon = $data['changePriceIcon'];
		$percent_title = __("TODAY'S CHANGE", "monbat");
		$percent = $data['changePrice'];
		$date = $data['date'];

		if (apply_filters('wpml_current_language', null) == 'bg') {
			$date = date('d.m.Y', strtotime($data['date']));
		}

		switch ($type) {
			case 'block':
				$output = <<<HTML
                <div class="ticker block-price">
                    <div class="top-row">
                        <div class="exchange-title">$exchange_title</div>
                        <div class="exchange-currency">
                            <div class="stock-top">
                             <span class="stock-title"><span>$currency_title</span>($currency)</span>
                             <span class="stock-group">
                              <span class="currency">$currency</span>
                              <span class="avg-price">$avg_price</span>
                             </span>
                            </div>
                            <div class="stock-bottom">
                             <span class="stock-title">$percent_title</span>
                             <span class="stock-icon $icon"></span>
                             <span class="percent $icon">$percent <span>%</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="bottom-row">
                        $bottom_title $date
                    </div>
                </div>
                HTML;
				break;
			default:
				$output = <<<HTML
                <div class="ticker header-price">
                    <div class="top-row">
                        <div class="exchange-title">$exchange_title</div>
                        <div class="exchange-currency">
                            <span class="currency">$currency</span>
                            <span class="avg-price">$avg_price</span>
                            <span class="stock-icon $icon"></span>
                            <span class="percent $icon">$percent <span>%</span></span>
                        </div>
                    </div>
                    <div class="bottom-row">
                        $bottom_title $date
                    </div>
                </div>
                HTML;
				break;
		}

		return $output;
	}
}

$ticker_cron = new TickerCron();


// Check if the cron event already registered
if (!wp_next_scheduled('get_ticker_cron_event')) {
	// Register cron event
	add_action('wp', array($ticker_cron, 'register_event'));
}

// Fetch data from RSS and save in the option table
add_action('get_ticker_cron_event', array($ticker_cron, 'get_data_and_save'));

// Register shortcode ticker
$exchange_price_shortcode = new StockPriceShortcode();
add_shortcode('price', array($exchange_price_shortcode, 'render'));
