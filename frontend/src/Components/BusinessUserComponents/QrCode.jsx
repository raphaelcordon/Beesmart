import { Document, Page, Text, View, StyleSheet, Image, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import backgroundImageUrl from "../../assets/loyaltyprogram_default_background.png"
import Button from '../SmallComponents/Button';
import { useSelector } from 'react-redux';
// import beelogo from "../../../public/beeicon.png";
// import qrcodeexample from "../../assets/qrcodeexample.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { faDownload} from '@fortawesome/free-solid-svg-icons';



// Styles for PDF
const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "absolute",
    width: "100%",
  },
  pageBackgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  imageBackground: {
    height: "100%",
    width: "100%",
  },
  pdfViewer: {
    width: "100%",
    height: "100vh",
  },
  page: {
    top: "0px",
    position: "absolute",
    height: "841px",
    width: "100%",
    backgroundColor: "#606060",
  },
  headingPrimary: {
    
    paddingTop: "10px",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  headingPrimary2: {
    
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    
  },
  styledqrcode: {
    width: '230px',
    height: '230px',
    //marginBottom: 10,
    marginTop: '382px',
    marginLeft: '183px',
  }, 
  
  image: {
    width: '150px',
    position: 'absolute',
   
    //marginLeft: '50px',
    marginLeft: '200px',
  
  },

});



const TextToPDF = ({ website, qrCode, logo}) => (
  <Document>
    <Page size="A4" style={{ ...styles.page }}>
      <View style={styles.pageBackgroundContainer}>
        <Image src={backgroundImageUrl} style={styles.imageBackground} />
      </View>
      <Image src={qrCode} style={styles.styledqrcode} />
      
      {/* <Image src={qrcodeexample} style={styles.styledqrcode} /> */}
      {website && (
        <View>
      <Text style={styles.headingPrimary}>
      Terms& Conditions:
        </Text>
      <Text style={styles.headingPrimary2}>
        {website}
        
      </Text>
      </View>
      )}
       {logo && <Image src={logo} style={styles.image} />}
      {/* <Image src={beelogo} style={styles.image} /> */}
    </Page>
  </Document>
);

TextToPDF.propTypes = {
  website: PropTypes.string,
  qrCode: PropTypes.string.isRequired, 
  logo: PropTypes.string,
    //businessName: PropTypes.string.isRequired,
};

const QrCode = () => {
  const CustomerUser = useSelector(state => state.customer.userCustomerData);
  const website = CustomerUser.customer_user_profile.website;
  const qrcode = CustomerUser.customer_user_profile.qr_code;
  const logo = CustomerUser.customer_user_profile.logo;
 // const businessName = CustomerUser.customer_user_profile.business_name;
 //const qrcode = localStorage.getItem('qrCode'); // Retrieve QR code from local storage

  const pdfData = <TextToPDF website={website} qrCode={qrcode} logo={logo} />; 
  



  return (
    <>
    <div className="md:pt-0">
      <section className="py-10 bg-transparent md:bg-base-100/50">
        {/* <div className="lg:w-[80%] md:w-[90%] xs:w-[80%] mx-10 md:mx-auto "> */}
          <div className="lg:w-[88%] md:w-[80%] xs:w-[100%] mx-auto bg-tsansparent pt-6  ">
            <div className="mb-4 w-full md:w-[75%] mx-auto text-center ">
             
                <div className="bg-base-100/60 w-[100%] pt-0 md:pt-6  flex flex-col justify-center shadow-lg">
              <FontAwesomeIcon icon={faDownload} className='text-xl p-5' /> Download your QR code now to effortlessly 
              connect with your customers. Simply display it in your storefront, 
              on your marketing materials, or even on your products. 
              
            <a href={qrcode} download="qr_code_beesmart.png">
              
            
            <Button className="m-6">Download QR code only</Button>
            </a>
            
            </div>
            

            
            <div className="bg-base-100/60 w-[100%] pt-0 md:pt-6  flex flex-col justify-center shadow-lg mt-8 mb-8 ">
            <FontAwesomeIcon icon={faDownload}  className='text-xl p-5'/> We've curated an eye-catching display option to make your QR code stand out.
            Upload Your Logo and website at Settings, than:
            <PDFDownloadLink document={pdfData} fileName="beesmart_qrcode.pdf" 
            className="btn bg-secondary btn-md-wide mx-auto text-base-100 m-4">
              {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
            </PDFDownloadLink></div>
            <div className='flex items-center justify-center  mb-4'>
            <PDFViewer className="h-[400px] w-[300px] lg:h-[600px] lg:w-[400px]">
            {/* <PDFViewer width={400} height={600}> */}
            {pdfData}
          </PDFViewer>
          </div>
          </div>
        </div>
        {/* </div> */}
        
      </section></div>
    </>
  );
};

export default QrCode;

