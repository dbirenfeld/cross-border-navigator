import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { DeclarationData } from "./types";
import { getTemplateForCountry } from "./templates";
import { DestinationCountry } from "@/types";
import { destinationCountries } from "@/lib/data/countries";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 9,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    borderBottom: "2px solid #000",
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  headerSubtitle: {
    fontSize: 10,
    marginTop: 4,
    color: "#333",
  },
  refNumber: {
    fontSize: 8,
    marginTop: 8,
    color: "#666",
  },
  section: {
    marginBottom: 15,
    border: "1px solid #ccc",
    padding: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    padding: 4,
    textTransform: "uppercase",
  },
  fieldRow: {
    flexDirection: "row",
    marginBottom: 6,
    borderBottom: "0.5px solid #eee",
    paddingBottom: 4,
  },
  fieldLabel: {
    width: 160,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#333",
  },
  fieldValue: {
    flex: 1,
    fontSize: 9,
    color: "#000",
    borderBottom: "0.5px dotted #999",
    minHeight: 12,
  },
  twoColumn: {
    flexDirection: "row",
    gap: 20,
  },
  column: {
    flex: 1,
  },
  declarationBox: {
    marginTop: 20,
    border: "1px solid #000",
    padding: 12,
  },
  declarationText: {
    fontSize: 8,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  signatureLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  signatureBlock: {
    width: 200,
    borderTop: "1px solid #000",
    paddingTop: 4,
    textAlign: "center",
    fontSize: 8,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 7,
    color: "#999",
    textAlign: "center",
    borderTop: "0.5px solid #ddd",
    paddingTop: 8,
  },
  officialUse: {
    marginTop: 15,
    border: "1px solid #000",
    padding: 10,
    minHeight: 60,
  },
  officialUseTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#666",
  },
});

interface DeclarationPdfProps {
  data: DeclarationData;
  destinationCountryCode: DestinationCountry;
}

export function DeclarationPdf({ data, destinationCountryCode }: DeclarationPdfProps) {
  const template = getTemplateForCountry(destinationCountryCode);
  const countryName = destinationCountries[destinationCountryCode].name;
  const refNumber = `CBN-${Date.now().toString(36).toUpperCase()}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{template.name}</Text>
          <Text style={styles.headerSubtitle}>
            {countryName} - Import Customs Declaration
          </Text>
          <Text style={styles.refNumber}>Reference: {refNumber} | Date: {data.declarationDate}</Text>
        </View>

        {/* Section 1: Importer Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 1: Importer Information</Text>
          <View style={styles.twoColumn}>
            <View style={styles.column}>
              <Field label="Full Name" value={data.importerName} />
              <Field label="ID/Passport No." value={data.importerId} />
              <Field label="Phone" value={data.importerPhone} />
            </View>
            <View style={styles.column}>
              <Field label="Email" value={data.importerEmail} />
              <Field label="Address" value={data.importerAddress} />
            </View>
          </View>
        </View>

        {/* Section 2: Goods Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 2: Description of Goods</Text>
          <Field label="Description" value={data.itemDescription} />
          <View style={styles.twoColumn}>
            <View style={styles.column}>
              <Field label="HS Code" value={data.hsCode} />
              <Field label="Quantity" value={String(data.quantity)} />
              <Field label="Country of Origin" value={data.countryOfOrigin} />
              <Field label="Manufacturer" value={data.manufacturer} />
            </View>
            <View style={styles.column}>
              <Field label="Unit Value" value={`${data.currency} ${data.unitValue.toLocaleString()}`} />
              <Field label="Total Value" value={`${data.currency} ${data.totalValue.toLocaleString()}`} />
              <Field label="Item Type" value={data.itemType} />
            </View>
          </View>
          {data.vehicleVin && (
            <>
              <Text style={{ ...styles.sectionTitle, marginTop: 8 }}>Vehicle Details</Text>
              <View style={styles.twoColumn}>
                <View style={styles.column}>
                  <Field label="VIN" value={data.vehicleVin} />
                  <Field label="Year" value={String(data.vehicleYear ?? "")} />
                  <Field label="Make" value={data.vehicleMake ?? ""} />
                </View>
                <View style={styles.column}>
                  <Field label="Model" value={data.vehicleModel ?? ""} />
                  <Field label="Color" value={data.vehicleColor ?? ""} />
                  <Field label="Mileage (km)" value={data.vehicleMileage ? String(data.vehicleMileage) : ""} />
                </View>
              </View>
            </>
          )}
        </View>

        {/* Section 3: Shipping */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 3: Transport Information</Text>
          <View style={styles.twoColumn}>
            <View style={styles.column}>
              <Field label="Shipping Method" value={data.shippingMethod} />
              <Field label="Vessel/Flight" value={data.vesselName ?? ""} />
              <Field label="Bill of Lading No." value={data.billOfLading ?? ""} />
            </View>
            <View style={styles.column}>
              <Field label="Port of Loading" value={data.portOfOrigin} />
              <Field label="Port of Discharge" value={data.portOfDestination} />
              <Field label="Est. Arrival Date" value={data.estimatedArrival ?? ""} />
            </View>
          </View>
        </View>

        {/* Declaration */}
        <View style={styles.declarationBox}>
          <Text style={styles.declarationText}>
            I hereby declare that the information provided in this customs declaration form is true,
            accurate, and complete to the best of my knowledge. I understand that any false or
            misleading information may result in penalties, seizure of goods, or criminal prosecution
            under the customs laws of {countryName}.
          </Text>
          <View style={styles.signatureLine}>
            <View style={styles.signatureBlock}>
              <Text>Importer Signature & Date</Text>
            </View>
            <View style={styles.signatureBlock}>
              <Text>Customs Officer Stamp</Text>
            </View>
          </View>
        </View>

        {/* For Official Use */}
        <View style={styles.officialUse}>
          <Text style={styles.officialUseTitle}>FOR OFFICIAL USE ONLY</Text>
        </View>

        <Text style={styles.footer}>
          Generated by CrossBorder Navigator | This form must be submitted with supporting documents (invoice, bill of lading, certificate of origin)
        </Text>
      </Page>
    </Document>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}:</Text>
      <Text style={styles.fieldValue}>{value || " "}</Text>
    </View>
  );
}
