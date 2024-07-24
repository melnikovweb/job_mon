/**
 * BLOCK: Animation Block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;
const { Fragment } = wp.element;

registerBlockType( 'cgb/block-animation-blocks', {
	title: __( 'Animation Block' ),
	icon: 'welcome-widgets-menus',
	category: 'monbat-blocks',
	keywords: [
		__( 'Animation' ),
	],

	attributes: {
		animationType: {
			type: 'string',
			default: 'content',
		},

		animationX: {
			type: 'string',
			default: '0',
		},

		animationY: {
			type: 'string',
			default: '0',
		},

		delay: {
			type: 'string',
			default: '0',
		},

		duration: {
			type: 'string',
			default: '0.6',
		},

		fade: {
			type: 'string',
			default: 'disable',
		},
	},

	edit: ( props ) => {
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Animation' ) }>
						<SelectControl
							label="Animation"
							value={ props.attributes.animationType }
							options={ [
								{ label: 'Content On Scroll', value: 'content' },
								{ label: 'Home Slider', value: 'slider' },
							] }
							onChange={ ( animationType ) => props.setAttributes( { animationType } ) }
						/>
						<SelectControl
							label="Animation TypeX"
							value={ props.attributes.animationX }
							options={ [
								{ label: 'Disable', value: '0' },
								{ label: 'Scroll Left', value: '-101%' },
								{ label: 'Scroll Right', value: '101%' },
							] }
							onChange={ ( animationX ) => props.setAttributes( { animationX } ) }
						/>
						<SelectControl
							label="Animation TypeY"
							value={ props.attributes.animationY }
							options={ [
								{ label: 'Disable', value: '0' },
								{ label: 'Scroll Down', value: '-101%' },
								{ label: 'Scroll Up', value: '101%' },
							] }
							onChange={ ( animationY ) => props.setAttributes( { animationY } ) }
						/>
						<SelectControl
							label="Animation Fade"
							value={ props.attributes.fade }
							options={ [
								{ label: 'Disable', value: 'disable' },
								{ label: 'Fade', value: 'fade' },
							] }
							onChange={ ( fade ) => props.setAttributes( { fade } ) }
						/>
						<SelectControl
							label="Animation Duration"
							value={ props.attributes.duration }
							options={ [
								{ label: '0', value: '0' },
								{ label: '0.1', value: '0.1' },
								{ label: '0.2', value: '0.2' },
								{ label: '0.3', value: '0.3' },
								{ label: '0.4', value: '0.4' },
								{ label: '0.5', value: '0.5' },
								{ label: '0.6', value: '0.6' },
								{ label: '0.7', value: '0.7' },
								{ label: '0.8', value: '0.8' },
								{ label: '0.9', value: '0.9' },
								{ label: '1', value: '1' },
							] }
							onChange={ ( duration ) => props.setAttributes( { duration } ) }
						/>
						<SelectControl
							label="Animation Delay"
							value={ props.attributes.delay }
							options={ [
								{ label: '0', value: '0' },
								{ label: '0.1', value: '0.1' },
								{ label: '0.2', value: '0.2' },
								{ label: '0.3', value: '0.3' },
								{ label: '0.4', value: '0.4' },
								{ label: '0.5', value: '0.5' },
								{ label: '0.6', value: '0.6' },
								{ label: '0.7', value: '0.7' },
								{ label: '0.8', value: '0.8' },
								{ label: '0.9', value: '0.9' },
								{ label: '1', value: '1' },
								{ label: '1.1', value: '1.1' },
								{ label: '1.2', value: '1.2' },
								{ label: '1.3', value: '1.3' },
								{ label: '1.4', value: '1.4' },
								{ label: '1.5', value: '1.5' },
							] }
							onChange={ ( delay ) => props.setAttributes( { delay } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ `sk-${ props.attributes.animationType }-animation` }>
					<div className={ `sk-${ props.attributes.animationType }-animation__wrapp` }>
						<InnerBlocks />
					</div>
				</div>
			</Fragment>
		);
	},

	save: ( props ) => {
		return (
			<div className={ `sk-${ props.attributes.animationType }-animation` }>
				<div className={ `sk-${ props.attributes.animationType }-animation__wrapp` } data-sk-delay={ props.attributes.delay } data-sk-duration={ props.attributes.duration } data-sk-typeX={ props.attributes.animationX } data-sk-typeY={ props.attributes.animationY } data-sk-fade={ props.attributes.fade }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
