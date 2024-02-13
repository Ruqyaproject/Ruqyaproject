import { StyleSheet} from 'react-native'
import Colors from '../../Colors/Colors'

const styles = StyleSheet.create({
    container:{ flexDirection: "column", borderRadius: 6, borderColor: Colors.primaryColor, overflow: "hidden", },
    dateContainer:{ backgroundColor: Colors.darkGreen, padding: 2, alignItems: "center", justifyContent: "center", },
    textStyle:{ fontSize: 9, fontWeight: "500", color: Colors.white,paddingTop:1,paddingHorizontal:3 },
    subContainer:{ alignItems: "center", justifyContent: "center", backgroundColor: Colors.white, paddingHorizontal: 8,paddingBottom:1 },
    dateStyle:{ fontSize: 12, fontWeight: "700",color: Colors.black },
    monthYearStyle:{ fontSize: 10, fontWeight: "400",color: Colors.black,paddingBottom:2 },
})
export default styles