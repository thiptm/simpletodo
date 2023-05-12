export default function addKeyToArray(data) {
    const dataKey = data.map((item) => {
        return { ...item, key: item.id }
      })
      return dataKey;
}