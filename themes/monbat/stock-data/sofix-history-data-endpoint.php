<?php
class SofixHistoryDataEndpoint {
	public function __construct() {
		add_action('rest_api_init', [$this, 'register_sofix_endpoint']);
	}

	public function register_sofix_endpoint() {
		register_rest_route('sofix/v1', '/data', [
			'methods' => 'GET',
			'callback' => [$this, 'get_sofix_data'],
			'permission_callback' => '__return_true',
		]);
	}

	public function get_sofix_data($request) {

		$transient_key = 'sofix_data_transient';
		$expiration = 60 * 60;

		$data = get_transient($transient_key);

		if (!$data) {
			$response = file_get_contents(__DIR__ . '/stock-sofix-index-data.json');

			$data = json_decode($response, true);

			if (!$data) {
				return new WP_Error('failed_to_fetch_data', 'Failed to fetch sofix data.', ['status' => 500]);
			}

			set_transient($transient_key, $data, $expiration);
		}

		return array('data'=>$data);
	}
}

new SofixHistoryDataEndpoint();
