const Thesis = {
    insert: gql`
        mutation insertThesis($object: thesis_insert_input!) {
            thesis: insert_thesis_one(object: $object) {
                thesis_id
            }
        }
    `,
    update: gql`
        mutation UpdateStudentMutation($id: uuid!, $object: student_set_input!) {
            update_student_by_pk(pk_columns: {student_id: $id}, _set: $object) {
                student_id
            }
    }
    `,
    delete: gql`
    mutation deleteThesis ($id: uuid!){
        delete_thesis_by_pk(thesis_id: $id) {
            thesis_id
        }
    }
    `,
    getAll: gql`
      query thesis($offset: Int, $limit: Int) {
        thesis(offset: $offset, limit: $limit) {
            thesis_id
            thesis_title_lao
            thesis_title_eng
            thesis_type_id
            major_id
            degree_type_id
            thesis_year
            thesis_advisor_name
            thesis_abstract_info_lao
            thesis_abstract_info_eng
            thesis_author_1
            thesis_author_2
            thesis_author_3
            seen
            liked
            downloaded
            file_id
        }
    }
    `
    ,
    getOne: gql`
        query thesis($id: uuid!) {
            thesis_by_pk(thesis_id: $id) {
                thesis_id
                thesis_title_lao
                thesis_title_eng
                thesis_type_id
                major_id
                degree_type_id
                thesis_year
                thesis_advisor_name
                thesis_abstract_info_lao
                thesis_abstract_info_eng
                thesis_author_1
                thesis_author_2
                thesis_author_3
                seen
                liked
                downloaded
                file_id
            }
        }
    `,
    countAll: gql`
        {
            thesis_aggregate {
                aggregate {
                count(columns: thesis_id)
                }
            }
        }
    `,
    search: gql`
        query search ($strText: String!, $phone: Int!) {
        student(where:
            {
            _or: [
                {student_lastname: {_ilike: $strText}},
                {student_firstname: {_ilike: $strText}},
                {student_email: {_ilike: $strText}},
                {student_phone: {_eq: $phone}},
            ]
            }
        ) {
            student_id
            student_profile
            student_firstname
            student_lastname
            student_gender
            student_phone
            student_email
            major_id
            degree_type_id
        }
    }
    `,
}

export default Thesis;