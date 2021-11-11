export default {
  randomRGB() {
    let color = { r:0, g:0, b:0 }
    for( let i in color) {
      color[i] = Math.floor(Math.random() * 256)
    }
    return "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
  },
  userIdSplitShopLists(shoplists, user_id) {
    let all_users_ids = [], id_split_shoplists = [], mySetArray, user_id_index, splice_id_split_shoplists, sortUserShoplists
    let mySet = new Set()
    shoplists.forEach( (shoplist, index) => {
      all_users_ids.push(shoplist.user_id)
      mySet.add(shoplist.user_id)
    });
    mySetArray = [...mySet]

    // console.log(mySet)
    // console.log(mySetArray)
    //{ 0: {user_id: id, shoplists: n}}
    for (let i = 0; i < mySetArray.length; i++) {
      id_split_shoplists[i] = {}
      id_split_shoplists[i].user_id = mySetArray[i]
      id_split_shoplists[i].shoplists = 0
      for(let n = 0; n < all_users_ids.length; n++) {
        if (mySetArray[i] === all_users_ids[n]) {
          id_split_shoplists[i].shoplists += 1
        }
      }
    }
    user_id_index = id_split_shoplists.findIndex((split) => split.user_id === user_id);
    //console.log(user_id_index)
    //console.log(id_split_shoplists)
    splice_id_split_shoplists = id_split_shoplists.splice(user_id_index, 1);
    //console.log(splice_id_split_shoplists)
    //console.log(id_split_shoplists)

    //console.log(this.ascendingUserShoplist(id_split_shoplists))
    sortUserShoplists = this.ascendingUserShoplist(id_split_shoplists)
    sortUserShoplists.unshift(splice_id_split_shoplists[0])
    return sortUserShoplists
    //console.log(sortUserShoplists)
    // console.log(splice_id_split_shoplists[0])
    // console.log(sortUserShoplists)
    // console.log(typeof sortUserShoplists)
    //console.log(sortUserShoplists.unshift(splice_id_split_shoplists[0]))
    //console.log(sortUserShoplists.unshift(splice_id_split_shoplists[0]))
    //id_split_shoplists.unshift(splice_id_split_shoplists[0]);

    //console.log(id_split_shoplists)



    //}
    // all_users_ids=[1,1,2,3,2,1,1,3,2,1,3]
    // all_users_ids.forEach((id, index , self) => {
    //
    // });
  },
  ascendingUserShoplist(shoplists) {
    return shoplists.sort(
      (a, b) => {
        if (a.shoplists < b.shoplists ) {
          return 1;
        } else if (a.shoplists > b.shoplists) {
          return -1;
        } else {
          if (a.user_id > b.user_id) {
            return 1;
          } else if (a.user_id < b.user_id){
            return -1;
          } else {

          }
        }
      }
    )
  },
  makeFormatConicGradient(parcent, multi_chart, color) {
    let parcent_propaty_format = {}, regexp_color = new RegExp(/^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,?\s*\d?.?\d?\s*\)/)

    if (typeof parcent === 'number' && typeof multi_chart.user_id === 'number' && typeof multi_chart.shoplists === 'number' && regexp_color.test(color)) {
      parcent_propaty_format.parcent = parcent
      parcent_propaty_format.user = multi_chart.user_id
      parcent_propaty_format.length = multi_chart.shoplists
      parcent_propaty_format.rgb = `background-color: ${color};`
    } else {
      parcent_propaty_format.parcent = 0
      parcent_propaty_format.user = -1
      parcent_propaty_format.length = 0
      parcent_propaty_format.rgb = 'background-color: rgba(0, 0, 0, 0.5);'
    }
    return parcent_propaty_format
  }
}
