/**
 * BLOCK: Home Slider Item
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import './parent';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, MediaUpload, MediaPlaceholder, BlockIcon, BlockControls, MediaUploadCheck } = wp.blockEditor;
const { PanelBody, Button, ToolbarButton, ToolbarGroup, ToggleControl } = wp.components;
const { Fragment } = wp.element;

const TEMPLATE = [
	[ 'core/group', { }, [
		[ 'core/columns', { }, [
			[ 'core/column', { }, [
				[ 'core/heading', { level: 2 } ],
				[ 'core/paragraph' ],
				[ 'core/buttons' ],
			] ],
			[ 'core/column', { }, [

			] ],
		] ],
	] ],
];

registerBlockType( 'cgb/home-slider-item', {
	title: __( 'Home Slider Item' ),
	icon: 'slides',
	category: 'monbat-blocks',
	parent: [ 'cgb/home-slider' ],
	attributes: {
		title: {
			type: 'string',
			default: '',
		},
		backgroundID: {
			type: 'number',
		},
		backgroundUrl: {
			type: 'string',
			default: 'https://via.placeholder.com/1920x850',
		},
		images: {
			type: 'array',
			default: [],
		},
		position: {
			type: 'boolean',
			defaule: false,
		},
	},
	keywords: [
		__( 'monbat' ),
		__( 'slider' ),
		__( 'home' ),
	],

	edit: ( { attributes, setAttributes } ) => {
		const hasImages = attributes.images.length > 0;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Slide Info' ) }>
						<h3 className="panelbody-title">Background Image</h3>
						<MediaUpload
							onSelect={ ( media ) => setAttributes( { backgroundUrl: media.url, backgroundID: media.id } ) }
							type="image"
							render={ ( { open } ) => (
								<Button onClick={ open } className="components-button is-primary">Open Media Library</Button>
							) }
						/>
						<h3 className="panelbody-title">Pagination Title</h3>
						<RichText
							tagName="p"
							placeholder="Monbat Group"
							value={ attributes.title }
							onChange={ value => {
								setAttributes( { title: value } );
							} }
						/>
						<h3 className="panelbody-title">Content Position</h3>
						<ToggleControl
							label={ __( 'Absolute?' ) }
							help="Check to change slide content position to absolute."
							checked={ attributes.position }
							onChange={ ( position ) => {
								setAttributes( { position } );
							} }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ 'home-slider__item swiper-slide' } style={ { backgroundImage: ` url( ${ attributes.backgroundUrl } ) ` } } data-title={ attributes.title }>
					<div className={ 'home-slider__lines' }>
						<div className={ 'line' }></div>
						<div className={ 'line' }></div>
						<div className={ 'line' }></div>
						<div className={ 'line' }></div>
						<div className={ 'line' }></div>
						<div className={ 'line' }></div>
					</div>
					<div className={ 'home-slider__letters' }>
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
								labels={ { title: 'Letters Gallery' } }
								onSelect={ ( newImages ) => setAttributes( { images: newImages } ) }
							/>
						) }

						{ hasImages && attributes.images.map( ( image, index ) => (
							<figure key={ index } className="home-slider__letter">
								<img src={ image.url } width={ image.sizes && image.sizes.full.width } height={ image.sizes && image.sizes.full.height } className="home-slider__letter__img" alt={ image.alt } />
							</figure>
						) ) }
					</div>
					<div className={ `home-slider__content ${ attributes.position ? 'sk-news-absolute' : '' }` }>
						<InnerBlocks template={ TEMPLATE } />
					</div>
				</div>
			</Fragment>
		);
	},

	save: ( { attributes } ) => {
		return (
			<div className={ 'home-slider__item swiper-slide' } style={ { backgroundImage: ` url( ${ attributes.backgroundUrl } ) ` } } data-title={ attributes.title }>
				<div className={ 'home-slider__lines' }>
					<div className={ 'line' }></div>
					<div className={ 'line' }></div>
					<div className={ 'line' }></div>
					<div className={ 'line' }></div>
					<div className={ 'line' }></div>
					<div className={ 'line' }></div>
				</div>
				{ attributes.images.length > 0 && (
					<div className={ 'home-slider__letters' }>
						{ attributes.images.map( ( image, index ) => (
							<figure key={ index } className="home-slider__letter">
								<img src={ image.url } width={ image.sizes && image.sizes.full.width } height={ image.sizes && image.sizes.full.height } className="home-slider__letter__img" alt={ image.alt } />
							</figure>
						) ) }
					</div>
				) }
				<div className={ `home-slider__content ${ attributes.position ? 'sk-news-absolute' : '' }` }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
