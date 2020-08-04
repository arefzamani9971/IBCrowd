
/*eslint array-callback-return: "off"*/
const sideBarMenuList = {
    searchItems: function (sideItems, sidebarSearchItem) {
        let returnedItem = [];
        if (sidebarSearchItem === '' || !sidebarSearchItem) {
            returnedItem = sideItems;
        }
        
        else {
            sideItems.map(item => {
                if (item.menu.menuTitle.includes(sidebarSearchItem)) {
                    returnedItem.push(item);
                }

                else {
                    item.childs.map(subIitemOne => {
                        if (!item.menu.menuTitle.includes(sidebarSearchItem) && subIitemOne.menu.menuTitle.includes(sidebarSearchItem)) {
                            returnedItem.push(subIitemOne)
                        }

                        else {
                            subIitemOne.childs.map(subIitemTwo => {
                                if (!item.menu.menuTitle.includes(sidebarSearchItem) && !subIitemOne.menu.menuTitle.includes(sidebarSearchItem) && subIitemTwo.menu.menuTitle.includes(sidebarSearchItem)) {
                                    returnedItem.push(subIitemTwo)
                                }

                            });
                        }
                    });
                }
            });
        }
        return returnedItem;
    }
}

export default sideBarMenuList;
