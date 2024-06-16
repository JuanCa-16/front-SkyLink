import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    container: {
        backgroundColor: '#fff',
        width: 800, // Ajustar el ancho para orientación horizontal
        height: 500, // Ajustar el alto para orientación horizontal
        border: '2px solid #13257fcc',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        margin: 'auto',
    },
    header: {
        backgroundColor: '#13257fcc',
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
    },
    airline: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    boardingPassTitle: {
        fontSize: 18,
    },
    details: {
        padding: 20,
    },
    passengerInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    info: {
        width: '45%',
        marginBottom: 10,
        position: 'relative',
    },
    infoText: {
        fontWeight: 'bold',
    },
    infoAfter: {
        content: '',
        position: 'absolute',
        bottom: -5,
        left: 0,
        width: '100%',
        borderBottom: '1px solid #ccc',
    },
    barcode: {
        textAlign: 'center',
        paddingVertical: 20,
    },
    gateTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#13257fcc',
        padding: 10,
        marginTop: 10,
        color: 'white',
        textAlign: 'center',
        cursor: 'pointer',
    },
});

const PDFDocument = ({ name, busqueda, v, eTicket, selectedSeats, puerta }) => (
    <Document>
        <Page style={styles.page} orientation="landscape">
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.airline}>SkyLink</Text>
                    <Text style={styles.boardingPassTitle}>PASE DE ABORDAJE</Text>
                </View>
                <View style={styles.details}>
                    <View style={styles.passengerInfo}>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Nombre del pasajero</Text>
                            <Text>{name}</Text>
                            <Text style={styles.infoAfter}></Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Fecha</Text>
                            <Text>{busqueda.fecha}</Text>
                            <Text style={styles.infoAfter}></Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Salida</Text>
                            <Text>{v.nombre_aeropuerto_salida}</Text>
                            <Text style={styles.infoAfter}></Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Destino</Text>
                            <Text>{v.nombre_aeropuerto_llegada}</Text>
                            <Text style={styles.infoAfter}></Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Transportadora</Text>
                            <Text>AC</Text>
                            <Text style={styles.infoAfter}></Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>N° de Vuelo</Text>
                            <Text>{v.id_vuelo}</Text>
                            <Text style={styles.infoAfter}></Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Equipaje</Text>
                            <Text>S</Text>
                            <Text style={styles.infoAfter}></Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>E-ticket</Text>
                            <Text>{eTicket}</Text>
                            <Text style={styles.infoAfter}></Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Clase</Text>
                            <Text>{busqueda.misClases}</Text>
                            <Text style={styles.infoAfter}></Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Asiento</Text>
                            {selectedSeats.map((asiento, index) => (
                                <Text key={index}>{asiento}</Text>
                            ))}
                            <Text style={styles.infoAfter}></Text>
                        </View>
                    </View>
                    <View style={styles.gateTime}>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Puerta</Text>
                            <Text>{puerta}</Text>
                            <Text style={styles.infoAfter}></Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Hora</Text>
                            <Text>{v.hora}</Text>
                            <Text style={styles.infoAfter}></Text>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default PDFDocument;