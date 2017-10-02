import React, { Component } from 'react';
import { Alert, AppRegistry, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Button,  Text, Thumbnail, List, ListItem, Left, Body, Right } from 'native-base';
import t from 'tcomb-form-native';
import ImagePicker from 'react-native-image-picker';

const Form = t.form.Form;

const Tire = t.enums({
  Empat: 'Empat',
  Tiga: 'Tiga'
});

const Forms = t.struct({
  carName : t.String,
  carType : t.String,
  carSpeed:t.Number,
  cool:t.Boolean,
  tire: Tire
  
});

const options = {
  
  fields: {
    carName: {
      label: 'Nama Mobil',
      placeholder: 'Masukan Nama Mobil'
    },
    carType: {
      label: 'Tipe Mobil',
      placeholder: 'Masukan Tipe Mobil'
    },
    carSpeed: {
      label: 'Kecepatan',
      placeholder: 'Masukan Kecepatan'
    },
    cool: {
      label: 'Keren ?',
    },
    tire: {
      nullOption: {value: '', text: 'Pilih Berapa'},
      label: 'Berapa Ban Mobil ?'
    }
  },
  auto: 'placeholders',

  title: 'Select Image',
  
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};



export default class App extends Component {

  state = {
    avatarSource: null
  };

  onUpload() {
    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        this.setState({
          avatarSource: source
        });
      }
    });
  }
  
  constructor(props) {
    super(props);
      this.state = {
        lists:[]
      };
  }
  
  onSave(){
    let imageSource = this.state.avatarSource
    
    let value = this.refs.form.getValue();

    let anis = Object.assign( {value, imageSource} );
    
    let list = this.state.lists

    list.push(anis);
        
    this.setState({
      lists: list,
      avatarSource: null
    })
  }
      
  renderList(obj, index){
    return(
      <List key={index} >
      <ListItem>
      <Left>
      <Thumbnail large source={ obj.imageSource } />
      <Body>
          <Text>{obj.value.carName}</Text>
          <Text note>{obj.value.carType}</Text>
          <Text note>{obj.value.carSpeed}</Text>
          { obj.cool == true ? <Text note> Keren </Text> : <Text note>Jelek</Text> }
          <Text note>{obj.value.tire}</Text>
      </Body>
      </Left>
      
      <Right/>
    </ListItem>
    </List>
    )
  }

  render() {
    return (
      <Container>
        <Content>

          <View style={styles.container}>
            <View style={{alignItems:'center'}}>
              <TouchableOpacity onPress={this.onUpload.bind(this)}>
                <View style={{marginBottom: 20}} >
                { 
                  this.state.avatarSource == null ? 
                  <Image style={styles.image1} source={require('./img/upload.png')} /> :
                  <Image style={styles.image2} source={this.state.avatarSource} />
                }
                </View>
              </TouchableOpacity>
            </View>
            <Form
              ref='form'
              type={Forms}
              options={options}
            />
            <Button full onPress={()=>this.onSave()}>
              <Text>Submit</Text>
            </Button>
          </View>
          
          {this.state.lists.map((list, index)=>this.renderList(list, index))}

        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  upload: {
    height: 150,
    marginBottom: 10,
    justifyContent: 'center'
  },
  formInput: {
    fontSize:6
  },
  image1: {
    width:300,
    height:200
  },
  image2: {
    width:200,
    height:200
  },
  
});

AppRegistry.registerComponent('FormAnis', () => App);