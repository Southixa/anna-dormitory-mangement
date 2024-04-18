const Staff = {
    insert: gql`
        mutation insertStuff($object: staff_insert_input!) {
            staff: insert_staff_one(object: $object) {
                staff_id
                staff_profile
                staff_firstname
                staff_lastname
                staff_phone
                staff_email
                staff_password
                staff_role
            }
        }
    `,
    update: "",
    delete: "",
    getAll: "",
    getOne: "",
}

export default Staff;