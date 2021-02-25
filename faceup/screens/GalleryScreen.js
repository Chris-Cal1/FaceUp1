import React from 'react';
import { ScrollView, Image } from 'react-native';
import {Card, Badge, Text} from 'react-native-elements'

import {connect} from 'react-redux';
import photo from '../reducers/photo';

 function GalleryScreen (props) {

	var images = [
		require('../assets/picture-1.jpg'),
		require('../assets/picture-2.jpg'),
		require('../assets/picture-3.jpg'),
		require('../assets/picture-4.jpg'),
		
	];

	

	var myImages = props.photo.map((photo,i) => { 
		
		var badgeGlasses;
		if(photo.glasses) {
		 badgeGlasses = <Badge status="success" value="lunette"/>;
	     }
	   var badgeBeard;
		if(photo.beard) {
		 badgeBeard = <Badge status="success" value="barbe"/>;
	    }
	   var badgeHappy;
		if(photo.happy) {
		 badgeHappy = <Badge status="success" value="joyeux"/>;
	    }
	   var badgeHair;
		if(photo.hairColor) {
		 badgeHair = <Badge status="success" value={photo.hairColor}/>;
	    }

		return (
			<Card key= {i}>
					<Image
						style={{ width: '100%', height: 170, marginBottom: 10 }}
						source={{uri: photo.url}}
					/>
					<Badge status='success' value={photo.gender} />
					<Badge status='success' value={photo.age} />
					{badgeGlasses}
                     {badgeBeard}
                     {badgeHappy}
                      {badgeHair}

				</Card>
		)
	  
		})

	
    console.log(props.photo, 'PROPS.PHOTO =========>>>>>')
    return (
		
			<ScrollView style={{ marginTop: 25 }}>
				<Text h4 style={{ textAlign: 'center' }}>
					John's Gallery
				</Text>

				<Card>
					<Image
						style={{ width: '100%', height: 170, marginBottom: 10 }}
						source={images[0]}
					/>
					<Badge status='success' value='homme' />
					<Badge status='success' value='70 ans' />
					<Badge status='success' value='barbe' />
					<Badge status='success' value='joyeux' />
					<Badge status='success' value='cheuveux gris' />
				</Card>
				<Card>
					<Image
						style={{ width: '100%', height: 170, marginBottom: 10 }}
						source={images[1]}
					/>
					<Badge status='success' value='femme' />
					<Badge status='success' value='lunettes' />
					<Badge status='success' value='31 ans' />
					<Badge status='success' value='joyeuse' />
					<Badge status='success' value='cheuveux chatain' />
				</Card>
				<Card>
					<Image
						style={{ width: '100%', height: 170, marginBottom: 10 }}
						source={images[2]}
					/>
					<Badge status='success' value='homme' />
					<Badge status='success' value='lunette' />
					<Badge status='success' value='27 ans' />
					<Badge status='success' value='cheuveux noir' />
				</Card>
				<Card>
					<Image
						style={{ width: '100%', height: 170, marginBottom: 10 }}
						source={images[3]}
					/>
					<Badge status='success' value='femme' />
					<Badge status='success' value='lunette' />
					<Badge status='success' value='68 ans' />
					<Badge status='success' value='cheuveux gris' />
				</Card>
				
				{myImages}
			</ScrollView>
		);

};

function mapStateToProps(state) {
	console.log(state, 'PHOTO =============>>>>>>')
	return{ photo: state.photo};
	

}



export default connect (
    mapStateToProps,
    null
)(GalleryScreen)
 