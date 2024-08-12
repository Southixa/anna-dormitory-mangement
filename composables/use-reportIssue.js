import { useMessage } from "naive-ui";
import Models from "~/model";
export const useReportIssue = () => {
    const { nhost } = useNhost();
    const { upload, delFile } = useFile();
    const message = useMessage();



    const getAll = async () => {
        const { data, error } = await nhost.graphql.request(
            Models.Report_issue.getAll,
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນຜູ້ໃຊ້ລາຍງານບັນຫາບໍ່ສຳເລັດ");
            console.log("error occurred in getAll reportIssue =>", error);
            return false
        }
        return data.report_issue;
    }

    const getOne = async (id) => {
        const { data, error } = await nhost.graphql.request(
            Models.Report_issue.getOne,
            {
                report_issue_id: id
            }
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນຜູ້ໃຊ້ລາຍງານບັນຫາບໍ່ສຳເລັດ");
            console.log("error occurred in getOne reportIssue =>", error);
            return false
        }
        return data.report_issue_by_pk;
    }

    const searchReportIssue = async (keyword) => {
        const { data, error } = await nhost.graphql.request(
            Models.Report_issue.search,
            {
                strText: `%${keyword}%`
            }
        )
        if(error) {
            message.error("ຄົ້ນຫາຂໍ້ມູນຜູ້ໃຊ້ລາຍງານບໍ່ສຳເລັດ");
            console.log("error occurred in search reportIssue =>", error);
            return false
        }
        return data.report_issue
    }


    const del = async (id, image) => {

        const { data, error } = await nhost.graphql.request(
            Models.Report_issue.delete,
            {
                report_issue_id: id
            }
        )
        if(error) {
            message.error("ລົບຂໍ້ມູນລາຍງານບໍ່ສຳເລັດ");
            console.log("error occurred in delete reportIssue =>", error);
            return false
        }

        const delImage = await delFile(image)
        if(!delImage) return false

        message.success("ລົບຂໍ້ມູນລາຍງານສຳເລັດແລ້ວ");
        return true
    }

    return { getAll, getOne, searchReportIssue, del }
}