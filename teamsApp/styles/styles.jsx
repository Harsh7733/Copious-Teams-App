import { Button, StyleSheet } from "react-native";

export const stylesforMain = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
    fabText: {
        fontSize: 30,
        color: 'white',
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 150,
        right: 20,
        padding: 10,
    },
    optionButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 5,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    optionButtonText: {
        color: 'white',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    content: {
        paddingTop: 70,
        paddingHorizontal: 20,
        alignItems: 'left',
        width: '100%',
    },
    addButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        marginBottom: 20,
    },
    addButtonText: {
        fontFamily: 'Poppins-Bold',
        color: '#fff',
        fontSize: 16,
    },
});

export const stylesforHeader = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#3d3d3d',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    icon: {
        marginLeft: 'auto',
    },
});

export const stylesforHome = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        color: 'gray',
    },
});

export const stylesforFooter = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#3d3d3d',
        position: 'absolute',
        backgroundColor: '#303030',
        left: 0,
        right: 0,
        bottom: 0,
    },
    footerButton: {
        alignItems: 'center',
    },
});

export const stylesforTaskList = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    task: {
        fontSize: 16,
    },
});

export const stylesforAddTaskModal = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 20,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    input: {
        borderWidth: 1,
        color: 'black',
        padding: 10,
        marginVertical: 5,
        marginBottom: 5,
        borderColor: 'gray',
        borderRadius: 5,
    },
    rowinput: {
        borderWidth: 1,
        color: 'black',
        padding: 10,
        marginVertical: 5,
        marginBottom: 5,
        borderColor: 'gray',
        borderRadius: 5,
        width: '72%',
        height: 38,
    },
    header: {
        color: '#316cb5',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 0,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: 5,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
        marginVertical: 1,
        color: 'black',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    button: {
        marginHorizontal: 5,
    },
    popoverContent: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '300%',
        height: '50%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    popoverTag: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectedTagContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    selectedTag: {
        backgroundColor: 'teal',
        color: 'white',
        padding: 5,
        borderRadius: 5,
        margin: 2,
    },
    removeTag: {
        color: 'red',
        fontWeight: 'bold',
    },
    popoverTrigger: {
        color: 'blue',
        textDecorationLine: 'underline',
        padding: 10,
    },
    FooterButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',

    },
    addButton: {
        backgroundColor: 'teal',
        padding: 10,
        borderRadius: 8,
        marginBottom: 5,
        width: '40%',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',

    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tagsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    tag: {
        fontSize: 16,
        marginVertical: 5,
        backgroundColor: '#f1f1f1',
        padding: 5,
        borderRadius: 5,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 350,
    },
    modalContainers: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 350,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    buttonContainer: {
        backgroundColor: 'teal',
        padding: 10,
        borderRadius: 80,
        marginBottom: 5,
    },
});

export const stylesforAddSectionModal = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 20,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    input: {
        borderWidth: 1,
        color: 'black',
        padding: 10,
        marginVertical: 5,
        marginBottom: 5,
        borderColor: 'gray',
        borderRadius: 5,
    },
    rowinput: {
        borderWidth: 1,
        color: 'black',
        padding: 10,
        marginVertical: 5,
        marginBottom: 5,
        borderColor: 'gray',
        borderRadius: 5,
        width: '72%',
        height: 38,
    },
    header: {
        color: '#316cb5',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 0,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: 5,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
        marginVertical: 1,
        color: 'black',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    button: {
        marginHorizontal: 5,
    },
    popoverContent: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '300%',
        height: '50%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    popoverTag: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectedTagContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    selectedTag: {
        backgroundColor: 'teal',
        color: 'white',
        padding: 5,
        borderRadius: 5,
        margin: 2,
    },
    removeTag: {
        color: 'red',
        fontWeight: 'bold',
    },
    popoverTrigger: {
        color: 'blue',
        textDecorationLine: 'underline',
        padding: 10,
    },
    FooterButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',

    },
    addButton: {
        backgroundColor: 'teal',
        padding: 10,
        borderRadius: 8,
        marginBottom: 5,
        width: '40%',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',

    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tagsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    tag: {
        fontSize: 16,
        marginVertical: 5,
        backgroundColor: '#f1f1f1',
        padding: 5,
        borderRadius: 5,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 350,
    },
    modalContainers: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 350,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    buttonContainer: {
        backgroundColor: 'teal',
        padding: 10,
        borderRadius: 80,
        marginBottom: 5,
    },
});

export const stylesforAddBuildModal = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 20,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    input: {
        borderWidth: 1,
        color: 'black',
        padding: 10,
        marginVertical: 5,
        marginBottom: 5,
        borderColor: 'gray',
        borderRadius: 5,
    },
    rowinput: {
        borderWidth: 1,
        color: 'black',
        padding: 10,
        marginVertical: 5,
        marginBottom: 5,
        borderColor: 'gray',
        borderRadius: 5,
        width: '72%',
        height: 38,
    },
    header: {
        color: '#316cb5',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 0,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: 5,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
        marginVertical: 1,
        color: 'black',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    button: {
        marginHorizontal: 5,
    },
    popoverContent: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '300%',
        height: '50%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    popoverTag: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectedTagContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    selectedTag: {
        backgroundColor: 'teal',
        color: 'white',
        padding: 5,
        borderRadius: 5,
        margin: 2,
    },
    removeTag: {
        color: 'red',
        fontWeight: 'bold',
    },
    popoverTrigger: {
        color: 'blue',
        textDecorationLine: 'underline',
        padding: 10,
    },
    FooterButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 10,
    },
    addButton: {
        backgroundColor: 'teal',
        padding: 10,
        borderRadius: 8,
        marginBottom: 5,
        width: '40%',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',

    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tagsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    tag: {
        fontSize: 16,
        marginVertical: 5,
        backgroundColor: '#f1f1f1',
        padding: 5,
        borderRadius: 5,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 350,
    },
    modalContainers: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 350,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    buttonContainer: {
        backgroundColor: 'teal',
        padding: 10,
        borderRadius: 80,
        marginBottom: 5,
    },
});

export const stylesforBuildList = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    buildItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
});

export const stylesforViewTaskModal = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 30,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 20,
        marginLeft: 20,
        alignContent: 'center',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    input: {
        borderWidth: 1,
        color: 'black',
        padding: 10,
        marginVertical: 5,
        marginBottom: 5,
        borderColor: 'gray',
        borderRadius: 5,
    },
    rowinput: {
        borderWidth: 1,
        color: 'black',
        padding: 10,
        marginVertical: 5,
        marginBottom: 5,
        borderColor: 'gray',
        borderRadius: 5,
        width: '72%',
        height: 38,
    },
    header: {
        color: '#316cb5',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 0,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: 5,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
        marginVertical: 1,
        color: 'black',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    button: {
        marginHorizontal: 5,
    },
    popoverContent: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '300%',
        height: '50%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    popoverTag: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectedTagContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    selectedTag: {
        backgroundColor: 'teal',
        color: 'white',
        padding: 5,
        borderRadius: 5,
        margin: 2,
    },
    removeTag: {
        color: 'red',
        fontWeight: 'bold',
    },
    popoverTrigger: {
        color: 'blue',
        textDecorationLine: 'underline',
        padding: 10,
    },
    FooterButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 10,
    },
    addButton: {
        backgroundColor: 'teal',
        padding: 10,
        borderRadius: 8,
        marginBottom: 5,
        width: '40%',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',

    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tagsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    tag: {
        fontSize: 16,
        marginVertical: 5,
        backgroundColor: '#f1f1f1',
        padding: 5,
        borderRadius: 5,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 350,
    },
    modalContainers: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 350,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    buttonContainer: {
        backgroundColor: 'teal',
        padding: 10,
        borderRadius: 80,
        marginBottom: 5,
    },
});


export const stylesforSidebar = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
    },
    sidebarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 210,
        height: '100%',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingHorizontal: 20,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    AlignRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    item: {
        marginLeft: 8,
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    Button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 7,
        backgroundColor: '#024CAA',
        borderRadius: 10,
        borderColor: '#007bff',
        borderWidth: 3,
        width: 170,
    },
});

export const stylesforSection = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    sidebarContainer: {
        width: 200,
        height: '100%',
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    item: {
        fontSize: 18,
        color: 'black',
    },
    Button: {
        marginTop: '20%',
    },
    sectionRow: {
        flexDirection: 'row',  // Row direction for table layout
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    sectionName: {
        fontSize: 16,
        flex: 1,  // Allow the name to take up most of the space
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 70,  // Adjust width to fit icons
    },
    icon: {
        marginHorizontal: 5,
    },
});

export const stylesforDailyReport = StyleSheet.create({
    content: {
        marginBottom: 80,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        height: 40,
        width: 200,
        marginLeft: 80,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginTop: 20,
    },
    input: {
        backgroundColor: '#ffffff',
        marginBottom: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        color: 'black',
    },
    reportItem: {
        backgroundColor: '#34495e',
        padding: 10,
        borderRadius: 5,
    },

    cardContainer: {
        marginBottom: 1,
        padding: 5,

    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        padding: 10,
        width: 350,

    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },

    cardText: {
        fontSize: 14,
        color: '#666',
        marginVertical: 2,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 350,
    },
    modalContainers: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 350,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttons: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        height: 40,
        width: 150,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 20,
    },
    picker: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        height: 57,
        marginBottom: 5,
    },
    header: {
        color: '#316cb5',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 0,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 20,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    input: {
        borderWidth: 1,
        color: 'black',
        padding: 10,
        marginVertical: 5,
        marginBottom: 5,
        borderColor: 'gray',
        borderRadius: 5,
    },
    rowinput: {
        borderWidth: 1,
        color: 'black',
        padding: 10,
        marginVertical: 5,
        marginBottom: 5,
        borderColor: 'gray',
        borderRadius: 5,
        width: '72%',
        height: 38,
    },
    header: {
        color: '#316cb5',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 0,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: 5,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
        marginVertical: 1,
        color: 'black',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    button: {
        marginHorizontal: 5,
    },
    popoverContent: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '300%',
        height: '50%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    popoverTag: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectedTagContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        color:'black',
    },
    selectedTag: {
        backgroundColor: 'teal',
        color: 'white',
        padding: 5,
        borderRadius: 5,
        margin: 2,
    },
    removeTag: {
        color: 'red',
        fontWeight: 'bold',
    },
    popoverTrigger: {
        color: 'blue',
        textDecorationLine: 'underline',
        padding: 10,
    },
    FooterButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',

    },
    addButton: {
        backgroundColor: 'teal',
        padding: 10,
        borderRadius: 8,
        marginBottom: 5,
        width: '40%',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',

    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tagsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    tasks: {
        fontSize: 16,
        marginVertical: 1,
        backgroundColor: 'teal',
        color: 'white',
        padding: 5,
        borderRadius: 5,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 350,
    },
    modalContainers: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 350,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    buttonContainer: {
        backgroundColor: 'teal',
        padding: 10,
        borderRadius: 80,
        marginBottom: 5,
    }
});
