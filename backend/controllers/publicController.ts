import path from "path"


export default {
    publicNavigation: (req, res) => {
        res.sendFile( path.join( __dirname, '../../frontend/dist/index.html' ) );
    }
}