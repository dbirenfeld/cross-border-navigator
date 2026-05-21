import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { CalculationResult } from "@/types";
import { originCountries, destinationCountries } from "@/lib/data/countries";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 9 },
  header: { textAlign: "center", marginBottom: 20, borderBottom: "2px solid #000", paddingBottom: 12 },
  title: { fontSize: 18, fontFamily: "Helvetica-Bold", textTransform: "uppercase" },
  subtitle: { fontSize: 10, marginTop: 4, color: "#333" },
  refLine: { fontSize: 8, color: "#666", marginTop: 6 },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", marginBottom: 6, borderBottom: "1px solid #ccc", paddingBottom: 3, textTransform: "uppercase" },
  row: { flexDirection: "row", marginBottom: 4 },
  labelCol: { width: 140, fontSize: 8, fontFamily: "Helvetica-Bold", color: "#333" },
  valueCol: { flex: 1, fontSize: 9, color: "#000" },
  table: { marginTop: 8, border: "1px solid #ccc" },
  tableHeader: { flexDirection: "row", backgroundColor: "#f5f5f5", borderBottom: "1px solid #ccc", padding: 6 },
  tableRow: { flexDirection: "row", padding: 6, borderBottom: "0.5px solid #eee" },
  tableCell: { flex: 1, fontSize: 8 },
  tableCellRight: { flex: 1, fontSize: 8, textAlign: "right" },
  tableCellBold: { flex: 1, fontSize: 8, fontFamily: "Helvetica-Bold" },
  totalSection: { marginTop: 12, borderTop: "2px solid #000", paddingTop: 8 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  totalLabel: { fontSize: 9, fontFamily: "Helvetica-Bold" },
  totalValue: { fontSize: 9, fontFamily: "Helvetica-Bold" },
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, fontSize: 7, color: "#999", textAlign: "center", borderTop: "0.5px solid #ddd", paddingTop: 8 },
  terms: { marginTop: 20, padding: 10, backgroundColor: "#fafafa", borderRadius: 4 },
  termsTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  termsText: { fontSize: 7, lineHeight: 1.4, color: "#444" },
});

function fmt(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

interface CommercialInvoicePdfProps {
  result: CalculationResult;
  importerName: string;
  importerAddress: string;
}

export function CommercialInvoicePdf({ result, importerName, importerAddress }: CommercialInvoicePdfProps) {
  const { input, breakdown, totalLandedCost, cifValue } = result;
  const invoiceNo = `INV-${Date.now().toString(36).toUpperCase()}`;
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const originName = originCountries[input.originCountry]?.name ?? "";
  const destName = destinationCountries[input.destinationCountry]?.name ?? "";

  const itemDesc = input.itemType === "vehicle"
    ? `${input.vehicleYear ?? ""} ${input.vehicleMake ?? ""} ${input.vehicleModel ?? ""} ${input.vehicleTrim ?? ""}`.trim()
    : `${input.itemType} goods`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Commercial Invoice</Text>
          <Text style={styles.subtitle}>For Customs Purposes</Text>
          <Text style={styles.refLine}>Invoice No: {invoiceNo} | Date: {date}</Text>
        </View>

        {/* Parties */}
        <View style={{ flexDirection: "row", marginBottom: 15, gap: 20 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Seller / Exporter</Text>
            <Text style={{ fontSize: 8, color: "#666", marginTop: 4 }}>
              (To be filled by seller)
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Buyer / Importer</Text>
            <View style={styles.row}>
              <Text style={styles.valueCol}>{importerName}</Text>
            </View>
            {importerAddress && (
              <View style={styles.row}>
                <Text style={styles.valueCol}>{importerAddress}</Text>
              </View>
            )}
            <View style={styles.row}>
              <Text style={{ fontSize: 8, color: "#666" }}>{destName}</Text>
            </View>
          </View>
        </View>

        {/* Shipment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipment Details</Text>
          <View style={styles.row}>
            <Text style={styles.labelCol}>Country of Origin:</Text>
            <Text style={styles.valueCol}>{originName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelCol}>Country of Destination:</Text>
            <Text style={styles.valueCol}>{destName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelCol}>Port of Loading:</Text>
            <Text style={styles.valueCol}>{input.originRegion}, {originName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelCol}>Port of Discharge:</Text>
            <Text style={styles.valueCol}>{input.destinationCity}, {destName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelCol}>Shipping Method:</Text>
            <Text style={styles.valueCol}>{input.shippingMethod === "roro" ? "RoRo (Roll-on/Roll-off)" : "Container (FCL)"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelCol}>Terms of Sale:</Text>
            <Text style={styles.valueCol}>CIF {input.destinationCity}</Text>
          </View>
        </View>

        {/* Item Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description of Goods</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCellBold}>Description</Text>
              <Text style={styles.tableCellBold}>HS Code</Text>
              <Text style={styles.tableCellBold}>Qty</Text>
              <Text style={{ ...styles.tableCellBold, textAlign: "right" }}>Unit Value (USD)</Text>
              <Text style={{ ...styles.tableCellBold, textAlign: "right" }}>Total (USD)</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{itemDesc}</Text>
              <Text style={styles.tableCell}>{input.itemType === "vehicle" ? "8703.24" : "8479.89"}</Text>
              <Text style={styles.tableCell}>1</Text>
              <Text style={styles.tableCellRight}>{fmt(input.itemValue)}</Text>
              <Text style={styles.tableCellRight}>{fmt(input.itemValue)}</Text>
            </View>
          </View>
        </View>

        {/* Financial Summary */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>FOB Value:</Text>
            <Text style={styles.totalValue}>{fmt(breakdown.basePrice)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={{ fontSize: 8 }}>Freight:</Text>
            <Text style={{ fontSize: 8 }}>{fmt(breakdown.shipping)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={{ fontSize: 8 }}>Insurance:</Text>
            <Text style={{ fontSize: 8 }}>{fmt(breakdown.insurance)}</Text>
          </View>
          <View style={{ ...styles.totalRow, borderTop: "1px solid #000", paddingTop: 4, marginTop: 4 }}>
            <Text style={styles.totalLabel}>CIF Value:</Text>
            <Text style={styles.totalValue}>{fmt(cifValue)}</Text>
          </View>
        </View>

        {/* Terms */}
        <View style={styles.terms}>
          <Text style={styles.termsTitle}>Declaration</Text>
          <Text style={styles.termsText}>
            I/We hereby certify that the information on this invoice is true and correct and that the
            contents of this shipment are as stated above. This invoice is provided for customs
            clearance purposes at the port of entry in {destName}.
          </Text>
        </View>

        <Text style={styles.footer}>
          Generated by CrossBorder Navigator | This document must be accompanied by the original Bill of Lading and Certificate of Origin
        </Text>
      </Page>
    </Document>
  );
}
