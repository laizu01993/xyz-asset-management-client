import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: { padding: 30 },
    header: { fontSize: 18, marginBottom: 20 },
    footer: { position: "absolute", bottom: 30, textAlign: "center", fontSize: 10 }
});

const AssetPrintPDF = ({ item, company }) => (
    <Document>
        <Page style={styles.page}>

            <Text style={styles.header}>
                {company.companyName}
            </Text>

            <Text>Asset: {item.assetName}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Approved At: {new Date(item.approvedAt).toLocaleDateString()}</Text>

            <Text style={styles.footer}>
                Printed on {new Date().toLocaleDateString()}
            </Text>
        </Page>
    </Document>
)

export default AssetPrintPDF;