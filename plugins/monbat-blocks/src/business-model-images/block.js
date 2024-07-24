/**
 * BLOCK: Business Model Images
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaPlaceholder, BlockIcon, BlockControls, MediaUpload, MediaUploadCheck, InspectorControls } = wp.blockEditor;
const { ToolbarButton, ToolbarGroup, PanelBody, SelectControl, ToggleControl, Button } = wp.components;
const { Fragment } = wp.element;

const addImg = ( imageUrl, imageAlt, imageWidth, imageHeight ) => {
	return (
		<figure className="business-model-images__media">
			<img className="business-model-images__img" src={ imageUrl } alt={ imageAlt } width={ imageWidth } height={ imageHeight } />
		</figure>
	);
};

const animationImg = ( image, index ) => {
	return (
		<div className={ 'sk-content-animation' }>
			<div className={ 'sk-content-animation__wrapp' } data-sk-delay={ 0.25 * index } data-sk-duration={ 1 } data-sk-typeX={ '101%' } data-sk-typeY={ '0' } data-sk-fade={ 'fade' }>
				<figure className="business-model-images__media">
					<img className="business-model-images__img" src={ image.url } alt={ image.alt } width={ image.sizes && image.sizes.full.width } height={ image.sizes && image.sizes.full.height } data-mediaid={ image.id } />
				</figure>
			</div>
		</div>
	);
};

const animationIcon = ( index ) => {
	return (
		<div className={ 'sk-content-animation' }>
			<div className={ 'sk-content-animation__wrapp' } data-sk-delay={ 0.25 * ( index + 1 ) } data-sk-duration={ 1 } data-sk-typeX={ '101%' } data-sk-typeY={ '0' } data-sk-fade={ 'fade' }>
				<span className="business-model-images__icon"></span>
			</div>
		</div>
	);
};

registerBlockType( 'cgb/business-model-images', {
	title: __( 'Business Model Images' ),
	icon: 'slides',
	category: 'monbat-blocks',
	attributes: {
		images: {
			type: 'array',
			default: [],
		},

		imagesMob: {
			type: 'array',
			default: [],
		},

		hideLAstArrow: {
			type: 'boolean',
			defaule: false,
		},

		position: {
			type: 'string',
			default: 'top',
		},

		sideImgUrl: {
			type: 'string',
		},

		sideImgAlt: {
			type: 'string',
		},

		sideImgWidth: {
			type: 'string',
		},

		sideImgHeight: {
			type: 'string',
		},
	},
	keywords: [
		__( 'business' ),
		__( 'model' ),
		__( 'images' ),
	],

	edit: ( ( { attributes, setAttributes, className } ) => {
		const hasImages = attributes.images.length > 0;
		const hasMobImages = attributes.imagesMob.length > 0;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Arrow Settings' ) }>
						<h3 className="panelbody-title">Red Arrow Position</h3>
						<SelectControl
							label="Position"
							value={ attributes.position }
							options={ [
								{ label: 'After Image', value: 'top' },
								{ label: 'On Bottom Image', value: 'bottom' },
							] }
							onChange={ ( position ) => setAttributes( { position } ) }
						/>
						<h3 className="panelbody-title">Hide Last Arrow?</h3>
						<ToggleControl
							label={ __( 'Show / Hide' ) }
							help="Check to hide last arrow."
							checked={ attributes.hideLAstArrow }
							onChange={ ( hideLAstArrow ) => {
								setAttributes( { hideLAstArrow } );
							} }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Side Image' ) }>
						<div className="panelbody-media__wrapp">
							<h3 className="panelbody-title">Upload Image</h3>
							<Button
								className="remove-item"
								icon="no-alt"
								label="Delete Image"
								onClick={ () => setAttributes( { sideImgUrl: '', sideImgAlt: '', sideImgWidth: '', sideImgHeight: '' } ) }
							/>
						</div>
						<div className="panelbody-media__wrapp">
							<MediaUpload
								onSelect={ ( media ) => setAttributes( { sideImgUrl: media.url, sideImgAlt: media.alt, sideImgWidth: media.sizes.full.width, sideImgHeight: media.sizes.full.height } ) }
								allowedTypes={ 'image' }
								render={ ( { open } ) => (
									<Button onClick={ open } className="components-button is-primary">Open Media Library</Button>
								) }
							/>
							<div className="panelbody-media">
								{ attributes.sideImgUrl && addImg( attributes.sideImgUrl, attributes.sideImgAlt, attributes.sideImgWidth, attributes.sideImgHeight ) }
							</div>
						</div>
					</PanelBody>
				</InspectorControls>
				<div className={ `${ className } business-model-images` }>
					<div className={ `business-model-images--desk ${ attributes.hideLAstArrow ? 'hide-last-arrow' : '' } arrow-position--${ attributes.position }` }>
						<BlockControls>
							<ToolbarGroup>
								<MediaUploadCheck>
									<MediaUpload
										multiple
										gallery
										addToGallery={ true }
										onSelect={ ( newImages ) => setAttributes( { images: newImages } ) }
										allowedTypes={ [ 'image' ] }
										value={ attributes.images.map( ( image ) => image.id ) }
										render={ ( { open } ) => (
											<ToolbarButton onClick={ open }>
												{ __( 'Edit Gallery', 'monbat' ) }
											</ToolbarButton> ) }
									/>
								</MediaUploadCheck>
							</ToolbarGroup>
						</BlockControls>
						{ ! hasImages && (
							<MediaPlaceholder
								multiple
								gallery
								icon={ <BlockIcon icon="format-gallery" /> }
								labels={ { title: 'Gallery' } }
								onSelect={ ( newImages ) => setAttributes( { images: newImages } ) }
							/>
						) }
						{ !! attributes.images && hasImages && attributes.images.map( ( image, index ) => (
							<div className="business-model-images__item" key={ index }>
								{ animationImg( image, index ) }
								{ animationIcon( index ) }
							</div>
						) ) }
						{ attributes.sideImgUrl &&
							<aside className="business-model-images__side">
								<div className={ 'sk-content-animation' }>
									<div className={ 'sk-content-animation__wrapp' } data-sk-delay={ 0.5 * attributes.images.length } data-sk-duration={ 1 } data-sk-typeX={ '101%' } data-sk-typeY={ '0' } data-sk-fade={ 'fade' }>
										{ addImg( attributes.sideImgUrl, attributes.sideImgAlt, attributes.sideImgWidth, attributes.sideImgHeight ) }
									</div>
								</div>
							</aside>
						}
					</div>
					<div className="business-model-images--mob">
						<BlockControls>
							<ToolbarGroup>
								<MediaUploadCheck>
									<MediaUpload
										multiple="add"
										gallery
										addToGallery={ true }
										onSelect={ ( newImages ) => setAttributes( { imagesMob: newImages } ) }
										allowedTypes={ [ 'image' ] }
										value={ attributes.imagesMob.map( ( image ) => image.id ) }
										render={ ( { open } ) => (
											<ToolbarButton onClick={ open }>
												{ __( 'Edit Mobile Gallery', 'monbat' ) }
											</ToolbarButton> ) }
									/>
								</MediaUploadCheck>
							</ToolbarGroup>
						</BlockControls>
						{ ! hasMobImages && (
							<MediaPlaceholder
								multiple
								gallery
								icon={ <BlockIcon icon="format-gallery" /> }
								labels={ { title: 'Mobile Gallery' } }
								onSelect={ ( newImages ) => setAttributes( { imagesMob: newImages } ) }
							/>
						) }
						{ !! attributes.imagesMob && hasMobImages && attributes.imagesMob.map( ( image, index ) => (
							<div className="business-model-images__item" key={ index }>
								{ animationImg( image, index ) }
							</div>
						) ) }
					</div>
				</div>
			</Fragment>
		);
	} ),

	save: ( { attributes, className } ) => {
		const { images, imagesMob } = attributes;

		return (
			<div className={ `${ className } business-model-images` }>
				<div className={ `business-model-images--desk ${ attributes.hideLAstArrow ? 'hide-last-arrow' : '' } arrow-position--${ attributes.position }` }>
					{ images.length > 0 && images.map( ( image, index ) => (
						<div className="business-model-images__item" key={ index }>
							{ animationImg( image, index ) }
							{ animationIcon( index ) }
						</div>
					) ) }
					{ attributes.sideImgUrl &&
						<aside className="business-model-images__side">
							<div className={ 'sk-content-animation' }>
								<div className={ 'sk-content-animation__wrapp' } data-sk-delay={ 0.25 * images.length } data-sk-duration={ 1 } data-sk-typeX={ '101%' } data-sk-typeY={ '0' } data-sk-fade={ 'fade' }>
									{ addImg( attributes.sideImgUrl, attributes.sideImgAlt, attributes.sideImgWidth, attributes.sideImgHeight ) }
								</div>
							</div>
						</aside>
					}
				</div>
				<div className="business-model-images--mob">
					{ imagesMob.length > 0 && imagesMob.map( ( image, index ) => (
						<div className="business-model-images__item" key={ index }>
							{ animationImg( image, index ) }
						</div>
					) ) }
				</div>
			</div>
		);
	},
} );
