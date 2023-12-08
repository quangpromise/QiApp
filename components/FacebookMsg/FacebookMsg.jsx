import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
    return (
      <FacebookProvider appId="7526769247354775" chatSupport>
        <CustomChat pageId="1567573553548567" minimized={true}/>
      </FacebookProvider>    
    );
}

export default FacebookMsg
