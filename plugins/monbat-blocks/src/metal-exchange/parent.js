/**
 * BLOCK: Metal Exchange
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { InnerBlocks, RichText, MediaUpload, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, SelectControl } = wp.components;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;

registerBlockType( 'cgb/metal-exchange', {
	title: __( 'Metal Exchange' ),
	icon: 'columns',
	category: 'monbat-blocks',
	attributes: {
		bottomText: {
			type: 'string',
		},
		topText: {
			type: 'string',
		},
		leftText: {
			type: 'string',
		},
		rightText: {
			type: 'string',
		},
		mainImgUrl: {
			type: 'string',
		},
		mainImgAlt: {
			type: 'string',
		},
		mainImgWidth: {
			type: 'string',
		},
		mainImgHeight: {
			type: 'string',
		},
		titleImgUrl: {
			type: 'string',
		},
		titleImgAlt: {
			type: 'string',
		},
		titleImgWidth: {
			type: 'string',
		},
		titleImgHeight: {
			type: 'string',
		},
		leftImgUrl: {
			type: 'string',
		},
		leftImgAlt: {
			type: 'string',
		},
		leftImgWidth: {
			type: 'string',
		},
		leftImgHeight: {
			type: 'string',
		},
		rightImgUrl: {
			type: 'string',
		},
		rightImgAlt: {
			type: 'string',
		},
		rightImgWidth: {
			type: 'string',
		},
		rightImgHeight: {
			type: 'string',
		},
		position: {
			type: 'string',
			default: 'bottom',
		},
	},
	keywords: [
		__( 'monbat' ),
		__( 'animation' ),
		__( 'metal' ),
		__( 'exchange' ),
	],

	edit: ( { attributes, setAttributes } ) => {
		const addImg = ( imgUrl, imgAlt, imgWidth, imgHeight ) => {
			return (
				<span className="metal-exchange__media">
					<img className="metal-exchange__img" src={ imgUrl } alt={ imgAlt } width={ imgWidth } height={ imgHeight } />
				</span>
			);
		};

		const controllerButon = ( position, attr, imgUrl, imgAlt, imgWidth, imgHeight ) => {
			return (
				<button className={ `metal-exchange__controller metal-exchange__controller--${ position } ${ attributes.position === position ? 'active' : '' }` } data-anchor={ `active-${ position }` }>
					<RichText
						tagName="span"
						placeholder="Title"
						allowedFormats={ [] }
						className="metal-exchange__title"
						value={ attributes.attr }
						onChange={ value => {
							setAttributes( { [ attr ]: value } );
						} }
					/>
					{ imgUrl && addImg( imgUrl, imgAlt, imgWidth, imgHeight ) }
				</button>
			);
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Controller Images' ) }>
						<div className="panelbody-wrapp">
							<h3 className="panelbody-title">{ __( 'Choose Active Tab' ) }</h3>
							<SelectControl
								label="Active Tab Position"
								value={ attributes.position }
								options={ [
									{ label: 'Bottom', value: 'bottom' },
									{ label: 'Top', value: 'top' },
									{ label: 'Left', value: 'left' },
									{ label: 'Right', value: 'right' },
								] }
								onChange={ ( position ) => setAttributes( { position } ) }
							/>
						</div>
						<div className="panelbody-wrapp">
							<h3 className="panelbody-title">{ __( 'Controller Image' ) }</h3>
							<div className="panelbody-media__wrapp">
								<MediaUpload
									onSelect={ ( media ) => setAttributes( { mainImgUrl: media.url, mainImgAlt: media.alt, mainImgWidth: media.sizes.full.width, mainImgHeight: media.sizes.full.height } ) }
									allowedTypes={ 'image' }
									render={ ( { open } ) => (
										<Button onClick={ open } className="components-button is-primary">Open Media Library</Button>
									) }
								/>
								<div className="panelbody-media">
									{ attributes.mainImgUrl && addImg( attributes.mainImgUrl, attributes.mainImgAlt, attributes.mainImgWidth, attributes.mainImgHeight ) }
								</div>
							</div>
						</div>
						<div className="panelbody-wrapp">
							<h3 className="panelbody-title">{ __( 'Controller Title Image' ) }</h3>
							<div className="panelbody-media__wrapp">
								<MediaUpload
									onSelect={ ( media ) => setAttributes( { titleImgUrl: media.url, titleImgAlt: media.alt, titleImgWidth: media.sizes.full.width, titleImgHeight: media.sizes.full.height } ) }
									allowedTypes={ 'image' }
									render={ ( { open } ) => (
										<Button onClick={ open } className="components-button is-primary">Open Media Library</Button>
									) }
								/>
								<div className="panelbody-media">
									{ attributes.titleImgUrl && addImg( attributes.titleImgUrl, attributes.titleImgAlt, attributes.titleImgWidth, attributes.titleImgHeight ) }
								</div>
							</div>
						</div>
						<div className="panelbody-wrapp">
							<h3 className="panelbody-title">{ __( 'Left Controller Image' ) }</h3>
							<div className="panelbody-media__wrapp">
								<MediaUpload
									onSelect={ ( media ) => setAttributes( { leftImgUrl: media.url, leftImgAlt: media.alt, leftImgWidth: media.sizes.full.width, leftImgHeight: media.sizes.full.height } ) }
									allowedTypes={ 'image' }
									render={ ( { open } ) => (
										<Button onClick={ open } className="components-button is-primary">Open Media Library</Button>
									) }
								/>
								<div className="panelbody-media">
									{ attributes.leftImgUrl && addImg( attributes.leftImgUrl, attributes.leftImgAlt, attributes.leftImgWidth, attributes.leftImgHeight ) }
								</div>
							</div>
						</div>
						<div className="panelbody-wrapp">
							<h3 className="panelbody-title">{ __( 'Right Controller Image' ) }</h3>
							<div className="panelbody-media__wrapp">
								<MediaUpload
									onSelect={ ( media ) => setAttributes( { rightImgUrl: media.url, rightImgAlt: media.alt, rightImgWidth: media.sizes.full.width, rightImgHeight: media.sizes.full.height } ) }
									allowedTypes={ 'image' }
									render={ ( { open } ) => (
										<Button onClick={ open } className="components-button is-primary">Open Media Library</Button>
									) }
								/>
								<div className="panelbody-media">
									{ attributes.rightImgUrl && addImg( attributes.rightImgUrl, attributes.rightImgAlt, attributes.rightImgWidth, attributes.rightImgHeight ) }
								</div>
							</div>
						</div>
					</PanelBody>
				</InspectorControls>
				<div className="metal-exchange">
					<div className="metal-exchange__controllers">
						<div className="metal-exchange__controller--center" data-slide-active={ `active-${ attributes.position }` }>
							<div className="metal-exchange__controller-img--main">
								{ attributes.mainImgUrl && addImg( attributes.mainImgUrl, attributes.mainImgAlt, attributes.mainImgWidth, attributes.mainImgHeight ) }
							</div>
							<div className="metal-exchange__controller-img--title">
								{ attributes.titleImgUrl && addImg( attributes.titleImgUrl, attributes.titleImgAlt, attributes.titleImgWidth, attributes.titleImgHeight ) }
							</div>
						</div>
						{ controllerButon( 'bottom', 'bottomText', null ) }
						{ controllerButon( 'top', 'topText', null ) }
						{ controllerButon( 'left', 'leftText', attributes.leftImgUrl, attributes.leftImgAlt, attributes.leftImgWidth, attributes.leftImgHeight ) }
						{ controllerButon( 'right', 'rightText', attributes.rightImgUrl, attributes.rightImgAlt, attributes.rightImgWidth, attributes.rightImgHeight ) }
					</div>
					<div className="metal-exchange__slides" data-slide-active={ `active-${ attributes.position }` } >
						<InnerBlocks template={ [ [ 'cgb/metal-exchange-item' ] ] } allowedBlocks={ [ 'cgb/metal-exchange-item' ] } />
					</div>
				</div>
			</Fragment>
		);
	},

	save: ( { attributes } ) => {
		const addImg = ( imgUrl, imgAlt, imgWidth, imgHeight ) => {
			return (
				<span className="metal-exchange__media">
					<img className="metal-exchange__img" src={ imgUrl } alt={ imgAlt } width={ imgWidth } height={ imgHeight } />
				</span>
			);
		};

		const controllerButton = ( position, attr, imgUrl, imgAlt, imgWidth, imgHeight ) => {
			return (
				<button className={ `metal-exchange__controller metal-exchange__controller--${ position } ${ attributes.position === position ? 'active' : '' }` } data-anchor={ `active-${ position }` }>
					<RichText.Content tagName="span" className="metal-exchange__title" value={ attr } />
					{ imgUrl && addImg( imgUrl, imgAlt, imgWidth, imgHeight ) }
				</button>
			);
		};

		return (
			<div className="metal-exchange">
				<div className="metal-exchange__controllers">
					<div className="metal-exchange__controller--center" data-slide-active={ `active-${ attributes.position }` }>
						<div className="metal-exchange__controller-img--main">
							{ attributes.mainImgUrl && addImg( attributes.mainImgUrl, attributes.mainImgAlt, attributes.mainImgWidth, attributes.mainImgHeight ) }
						</div>
						<div className="metal-exchange__controller-img--title">
							{ attributes.titleImgUrl && addImg( attributes.titleImgUrl, attributes.titleImgAlt, attributes.titleImgWidth, attributes.titleImgHeight ) }
						</div>
					</div>
					{ controllerButton( 'bottom', attributes.bottomText, null ) }
					{ controllerButton( 'top', attributes.topText, null ) }
					{ controllerButton( 'left', attributes.leftText, attributes.leftImgUrl, attributes.leftImgAlt, attributes.leftImgWidth, attributes.leftImgHeight ) }
					{ controllerButton( 'right', attributes.rightText, attributes.rightImgUrl, attributes.rightImgAlt, attributes.rightImgWidth, attributes.rightImgHeight ) }
				</div>
				<div className="metal-exchange__slides" data-slide-active={ `active-${ attributes.position }` }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
