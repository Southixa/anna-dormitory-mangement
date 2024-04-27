
export const useJoin = () => {

    const { client } = useApolloClient();
    const token = useCookie("token");
    class Join {

        constructor(itemList, joinTable = {tableName, idName, returnField}) {
            this.itemList = itemList;
            this.joinTable = joinTable;

            this.idList = this.extractId();
            this.schema = this.createSchema(this.idList);
        }

        extractId() {
            return this.itemList.map(item => item[this.joinTable.idName]);
        }

        createSchema(idList) {
            const parametersList = idList.map((_, index) => `$s${index + 1}: uuid!`);
            const compareList = idList.map((_, index) => `{${this.joinTable.idName}: {_eq: $s${index + 1}}}`);

            return gql`
             query search (${parametersList.join(", ")}) {
                ${this.joinTable.tableName}(where: {_or: [${compareList.join(", ")}]}) {
                     ${this.joinTable.returnField.join(", ")}
                 }
             }`
        }


        async returnJoin() {
            const { data } = await client.query({
                query: this.schema,
                variables: Object.assign({}, ...this.idList.map((id, index) => ({[`s${index + 1}`]: id})))
            })

            const hash = this.createHash(data[this.joinTable.tableName]);
            const newJoin = this.mergeData(this.itemList, hash);

            return newJoin;
        }

        createHash(items) {
            return items.reduce((hash, item) => {
                hash[item[this.joinTable.idName]] = item;
                return hash;
            }, {});
        }

        mergeData(itemList, hash) {
            return itemList.map(item => ({...item, [this.joinTable.tableName]: hash[item[this.joinTable.idName]]}));
        }

    }


    return {
        Join
    }

}