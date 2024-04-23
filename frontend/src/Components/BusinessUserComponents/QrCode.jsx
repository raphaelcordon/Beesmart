import { Document, Page, Text, View, StyleSheet, Image, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import backgroundImageUrl from "../../assets/loyaltyprogram_default_background.png"
import Button from '../SmallComponents/Button';
import { useSelector } from 'react-redux';

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
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  styledlogo: {
    width: '230px',
    height: '230px',
    marginBottom: 10,
    marginTop: '385px',
    marginLeft: '180px',
  }, 
  image: {
    width: '230px',
    height: '230px',
    marginBottom: 10,
    marginTop: '10px',
    marginLeft: '10px',
  }

});

import PropTypes from 'prop-types';

const TextToPDF = ({ website, qrCode, logo, businessName }) => (
  <Document>
    <Page size="A4" style={{ ...styles.page }}>
      <View style={styles.pageBackgroundContainer}>
        <Image src={backgroundImageUrl} style={styles.imageBackground} />
      </View>
      <Image src={qrCode} style={styles.styledlogo} /> {/* Use qrCode from props */}
      <Text style={styles.headingPrimary}>
        Website: {website}
      </Text>
      <Text style={styles.headingPrimary}>
        Business Name: {businessName}
      </Text>
    </Page>
  </Document>
);

TextToPDF.propTypes = {
  website: PropTypes.string.isRequired,
  qrCode: PropTypes.string.isRequired, 
  logo: PropTypes.string.isRequired,
    businessName: PropTypes.string.isRequired,
};

const QrCode = () => {
  const CustomerUser = useSelector(state => state.customer.userCustomerData);
  const website = CustomerUser.customer_user_profile.website;
  //const storedQrCode = CustomerUser.customer_user_profile.qr_code;
  const logo = CustomerUser.customer_user_profile.logo;
  const businessName = CustomerUser.customer_user_profile.business_name;
 const storedQrCode = localStorage.getItem('qrCode'); // Retrieve QR code from local storage

  const pdfData = <TextToPDF website={website} qrCode={storedQrCode} businessName={businessName} logo={logo} />; 

  return (
    <div className="flex items-center justify-center h-full">
      <div className='mb-8'>
        <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">
          <div className='mb-8'><Button>Download QR code only</Button></div>
          <Button>
            <PDFDownloadLink document={pdfData} fileName="beesmart_qrcode.pdf">
              {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
            </PDFDownloadLink>
          </Button>
        </div>
        <div>
          <PDFViewer width={400} height={600}>
            {pdfData}
          </PDFViewer>
        </div>
      </div>
    </div>
  );
};

export default QrCode;


