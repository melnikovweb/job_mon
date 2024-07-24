<?php
class BondHistoryDataEndpoint {
	private $path_to_storage;


	public function __construct() {
		add_action('rest_api_init', [$this, 'register_bond_endpoint']);
		$this->path_to_storage = __DIR__ . '/bond-data.json';
	}

	public function register_bond_endpoint() {
		register_rest_route('bond/v1', '/data', [
			'methods' => 'GET',
			'callback' => [$this, 'get_bond_data'],
			'permission_callback' => '__return_true',
		]);
	}

	public function get_bond_data() {

		$transient_key = 'bond_data_transient';
		$expiration = 60 * 60 * 24;

		$data = get_transient($transient_key);

		if (!$data) {
			if (!file_exists($this->path_to_storage)) {
				return new WP_Error('failed_to_read_file', 'Failed to read file with bond data.', ['status' => 500]);
			};

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

		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => 'https://www.infostock.bg/infostock/control/pricestats/5MBA',
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_POSTFIELDS => 'fromDateToDatePeriod=0&timePeriod=-10&date0=&date1=',
			CURLOPT_HTTPHEADER => array(
				'Content-Type: application/x-www-form-urlencoded',
				'Cookie: JSESSIONID=2BF418F72A999287AEDB8EC8E56A5086'
			),
		));

		$html = curl_exec($curl);

		curl_close($curl);

		$dom = new DOMDocument();
		@$dom->loadHTML($html);
		$field_names = ['timestamp', 'open', 'low','high','close', 'pmin', 'pmax','volume'];
		$result = [];

		$tables = $dom->getElementsByTagName('table');

		$table = $tables->item(2);

			foreach ($table->getElementsByTagName('tr') as $tr) {
				$i = 0;
				$row = [];
				$cells = $tr->getElementsByTagName('td');

				foreach ($field_names as $name) {
					if (!$td = $cells->item($i++))
						break;
					$row[$name] = trim($td->textContent);
				}

				if ($row)
					$result []= $row;
			}

			$new_data_item = array (
				'timestamp' => strtotime($result[0]['timestamp']),
				'open' => $result[0]['open'],
				'high' => $result[0]['high'],
				'low' => $result[0]['low'],
				'close' => $result[0]['close'],
				'volume' => $result[0]['volume'],
				'official' => $result[0]['close'],
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

new BondHistoryDataEndpoint();
