/**
 * BLOCK: Gallery Slider
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaPlaceholder, BlockIcon, BlockControls, MediaUpload, MediaUploadCheck } = wp.editor;
const { ToolbarButton, ToolbarGroup } = wp.components;

registerBlockType( 'cgb/gallery-slider', {
	title: __( 'Gallery Slider' ),
	icon: 'slides',
	category: 'monbat-blocks',
	attributes: {
		images: {
			type: 'array',
			default: [],
		},
	},
	keywords: [
		__( 'slider' ),
		__( 'gallery' ),
	],

	edit: ( ( { attributes, setAttributes, className } ) => {
		const hasImages = attributes.images.length > 0;

		return (
			<div className={ className }>
				<div className="gallery-slider swiper">
					<div className="swiper-wrapper">
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
						{ hasImages && attributes.images.map( ( image, index ) => <div className="gallery-slider__item swiper-slide" key={ index }><figure key={ index } className="gallery-slider__media"><img src={ image.url } className="gallery-slider__img" alt={ image.alt } width={ image.sizes && image.sizes.full.width } height={ image.sizes && image.sizes.full.height } /></figure></div> ) }
					</div>
					<div className="gallery-slider__pagination swiper-pagination"></div>
					<div className="gallery-slider__button-prev swiper-button-prev"></div>
					<div className="gallery-slider__button-next swiper-button-next"></div>
				</div>
			</div>
		);
	} ),

	save: ( { attributes, className } ) => {
		const { images } = attributes;

		return (
			<div className={ className }>
				<div className="gallery-slider swiper">
					<div className="swiper-wrapper">
						{ images.map( ( image, index ) => <div className="gallery-slider__item swiper-slide" data-hash={ `slide-${ index }` } key={ index }><figure className="gallery-slider__media"><img src={ image.url } className="gallery-slider__img" alt={ image.alt } width={ image.sizes && image.sizes.full.width } height={ image.sizes && image.sizes.full.height } data-mediaid={ image.id } /></figure></div> ) }
						{ images.map( ( image, index ) => <div className="gallery-slider__item swiper-slide" data-hash={ `slide-${ index }` } key={ index }><figure className="gallery-slider__media"><img src={ image.url } className="gallery-slider__img" alt={ image.alt } width={ image.sizes && image.sizes.full.width } height={ image.sizes && image.sizes.full.height } data-mediaid={ image.id } /></figure></div> ) }
					</div>
					<div className="gallery-slider__pagination swiper-pagination"></div>
					<div className="gallery-slider__button-prev swiper-button-prev"></div>
					<div className="gallery-slider__button-next swiper-button-next"></div>
				</div>
			</div>
		);
	},
} );
