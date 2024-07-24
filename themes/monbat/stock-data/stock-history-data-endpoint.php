<?php
class StockHistoryDataEndpoint {
	private $path_to_storage;


	public function __construct() {
		add_action('rest_api_init', [$this, 'register_stock_endpoint']);
		$this->path_to_storage = __DIR__ . '/stock-data.json';
	}

	public function register_stock_endpoint() {
		register_rest_route('stock/v1', '/data', [
			'methods' => 'GET',
			'callback' => [$this, 'get_stock_data'],
			'permission_callback' => '__return_true',
		]);
	}

	public function get_stock_data() {

		$transient_key = 'stock_data_transient';
		$expiration = 60 * 60 * 12;

		$data = get_transient($transient_key);

		if (!$data) {
			if (!file_exists($this->path_to_storage)) return new WP_Error('failed_to_read_file', 'Failed to read file with stock data.', ['status' => 500]);

			$response = file_get_contents($this->path_to_storage);
			$data = json_decode($response, true);
			$new_data = $this->get_data_and_save($data);

			if ($new_data) {
				$response = file_get_contents($this->path_to_storage);
				$data = json_decode($response, true);
			}

			set_transient($transient_key, $data, $expiration);
		}

		return array('data'=>$data);
	}

	public function get_data_and_save($existing_data = []) : bool
	{


		$page = file_get_contents("https://www.marketwatch.com/investing/stock/monb/download-data");
		$dom = new DomDocument();
		@$dom->loadHTML($page);
		$finder = new DomXPath($dom);
		$classname = "table__body";
		$nodes = $finder->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $classname ')]");
		$field_names = ['timestamp', 'open', 'high','low','close','volume'];
		$table = $nodes->item(0);
		$result = [];

		foreach ($table->getElementsByTagName('tr') as $tr) {
			$i = 0;
			$row = [];
			$cells = $tr->getElementsByTagName('td');

			foreach ($field_names as $name) {
				if (!$td = $cells->item($i++))
					break;
				$row[$name] = trim($td->getElementsByTagName('div')->item(0)->textContent);
			}

			if ($row)
				$result []= $row;
		}

		function replaceUnix(string $str): string {
			$new_string = str_replace('лв.', '',$str);
			return str_replace(',', '',$new_string);
		}

		$new_data_item = array (
			'timestamp' => strtotime($result[0]['timestamp']),
			'open' => replaceUnix($result[0]['open']),
			'high' => replaceUnix($result[0]['high']),
			'low' => replaceUnix($result[0]['low']),
			'close' => replaceUnix($result[0]['close']),
			'volume' => replaceUnix($result[0]['volume']),
			'official' => replaceUnix($result[0]['close']),
		);

		if (empty($new_data_item)) return false;

		$last_timestamp = end($existing_data)['timestamp'] ?? 0;
		if ($new_data_item['timestamp'] > $last_timestamp) {
			$existing_data[] = $new_data_item;
			file_put_contents($this->path_to_storage, json_encode($existing_data));

			return true;
		}

		return false;
	}
}

new StockHistoryDataEndpoint();
