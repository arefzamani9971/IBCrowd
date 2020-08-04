

import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import styles from './nestedListTheme';
import 'utils/fonts/isw.css';
import DisplayLink from './displayLink';
import DropDownList from './dropDownList';
import LinkGroup from './linkGroup';
import classNames from 'classnames';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import NestedListService from './services/nestedListService';
import sideBarMenuList from './nestedListItem';

class NestedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      search: '',
      searchItems: [],
      menuList: []
    };

    this.displayList = this.displayList.bind(this);
    this.handleChangeSearchField = this.handleChangeSearchField.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.successGetAllAccessedMenu = this.successGetAllAccessedMenu.bind(this);
  }


  componentDidMount() {
    var staticMenu = [];
    // staticMenu.unshift({
    staticMenu.push({
      menu: {
        parenMenuResourceId: null,
        type: 3,
        menuTitle: "مجامع"
      },
      childs: [
        {
          menu: {
            parenMenuResourceId: 15,
            type: 3,
            menuTitle: "مجامع و اطلاعیه‌ها",
            menuIcon: "fas fa-info"
          },
          childs: [
            {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "لیست اطلاعیه‌ها",
                menuIcon: "fas fa-info",
                menuPage: {
                  pageLink: "/main/statement/statementAndInformation/index"
                }
              }
            }, {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "تعدیلات قیمت",
                menuIcon: "fas fa-money-bill",
                menuPage: {
                  pageLink: "/main/statement/statementAndInformation/adjustedPrice"
                }
              }
            },
            // {
            //   childs: [],
            //   menu: {
            //     parenMenuResourceId: 16,
            //     type: 3,
            //     menuTitle: "محاسبه قیمت تعدیلی",
            //     menuIcon: "fas fa-calculator",
            //     menuPage: {
            //       pageLink: "/main/statement/statementAndInformation/calculateAdjustedPrice"
            //     }
            //   }
            // }, 
            {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "لیست زمان‌بندی تقسیم سود سهام",
                menuIcon: "fas fa-clock",
                menuPage: {
                  pageLink: "/main/statement/statementAndInformation/dividendTiming"
                }
              }
            }, {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "لیست زمان‌بندی شرکت در حق تقدم",
                menuIcon: "fas fa-clock",
                menuPage: {
                  pageLink: "/main/statement/statementAndInformation/stockRightTiming"
                }
              }
            }
            // , {
            //   childs: [],
            //   menu: {
            //     parenMenuResourceId: 16,
            //     type: 3,
            //     menuTitle: "افزودن مجمع",
            //     menuIcon: "fas fa-plus",
            //     menuPage: {
            //       pageLink: "/main/statement/statementAndInformation/addStatement"
            //     }
            //   }
            // }
          ]
        }
      ]
    }, {
      menu: {
        parenMenuResourceId: null,
        type: 3,
        menuTitle: "اوراق با درآمد ثابت"
      },
      childs: [
        {
          menu: {
            parenMenuResourceId: 15,
            type: 3,
            menuTitle: "اوراق با درآمد ثابت",
            menuIcon: "fas fa-copy"
          },
          childs: [
            {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "لیست اوراق",
                menuIcon: "fas fa-copy",
                menuPage: {
                  pageLink: "/main/bond/bonds/list"
                }
              }
            }, {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "سود اوراق",
                menuIcon: "fas fa-money-bill",
                menuPage: {
                  pageLink: "/main/bond/bonds/accruedInterest"
                }
              }
            }, {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "ارزش روزانه سلف",
                menuIcon: "fas fa-calculator",
                menuPage: {
                  pageLink: "/main/bond/bonds/dailyForwardPrice"
                }
              }
            }
          ]
        }
      ]
    }, {
      menu: {
        parenMenuResourceId: null,
        type: 3,
        menuTitle: "داده های بازار"
      },
      childs: [
        {
          menu: {
            parenMenuResourceId: 15,
            type: 3,
            menuTitle: "تعطیلات",
            menuIcon: "fas fa-money-bill"
          },
          childs: [
            {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "لیست تعطیلات",
                menuIcon: "fas fa-money-bill",
                menuPage: {
                  pageLink: "/main/marketData/holiday/holiday"
                }
              }
            },
            {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "افزودن تعطیلات",
                menuIcon: "fas fa-plus",
                menuPage: {
                  pageLink: "/main/marketData/holiday/addHoliday"
                }
              }
            }
          ]
        }, {
          menu: {
            parenMenuResourceId: 15,
            type: 3,
            menuTitle: "(Option) اختیار معامله",
            menuIcon: "fas fa-money-bill"
          },
          childs: [
            {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "لیست اختیار معامله",
                menuIcon: "fas fa-money-bill",
                menuPage: {
                  pageLink: "/main/marketData/optionDetails/options"
                }
              }
            },
            {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "افزودن اختیار معامله",
                menuIcon: "fas fa-plus",
                menuPage: {
                  pageLink: "/main/marketData/optionDetails/saveOptionDetail"
                }
              }
            }
          ]
        }, {
          menu: {
            parenMenuResourceId: 15,
            type: 3,
            menuTitle: "معاملات آتی سهام",
            menuIcon: "fas fa-money-bill"
          },
          childs: [
            {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "لیست معاملات آتی سهام",
                menuIcon: "fas fa-money-bill",
                menuPage: {
                  pageLink: "/main/marketData/futureContract/futureContract"
                }
              }
            },
            {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "افزودن معاملات آتی سهام",
                menuIcon: "fas fa-plus",
                menuPage: {
                  pageLink: "/main/marketData/futureContract/saveFutureContract"
                }
              }
            }
          ]
        }, {
          menu: {
            parenMenuResourceId: 15,
            type: 3,
            menuTitle: "بانک‌ها",
            menuIcon: "fas fa-money-bill"
          },
          childs: [
            {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "لیست بانک‌ها",
                menuIcon: "fas fa-money-bill",
                menuPage: {
                  pageLink: "/main/marketData/bank/bank"
                }
              }
            },
            {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "افزودن بانک",
                menuIcon: "fas fa-plus",
                menuPage: {
                  pageLink: "/main/marketData/bank/addBank"
                }
              }
            }
          ]
        }, {
          menu: {
            parenMenuResourceId: 15,
            type: 3,
            menuTitle: "کارگزارها",
            menuIcon: "fas fa-money-bill"
          },
          childs: [
            {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "لیست کارگزارها",
                menuIcon: "fas fa-money-bill",
                menuPage: {
                  pageLink: "/main/marketData/broker/broker"
                }
              }
            },
            {
              childs: [],
              menu: {
                parenMenuResourceId: 16,
                type: 3,
                menuTitle: "افزودن کارگزاری",
                menuIcon: "fas fa-plus",
                menuPage: {
                  pageLink: "/main/marketData/broker/addBroker"
                }
              }
            }
          ]
        }
      ]
    },
      {
        menu: {
          parenMenuResourceId: null,
          type: 3,
          menuTitle: "مانیتورینگ"
        },
        childs: [
          {
            menu: {
              parenMenuResourceId: 15,
              type: 3,
              menuTitle: "تغییرات داده های بازار",
              menuIcon: "fas fa-money-bill"
            },
            childs: [
              {
                childs: [],
                menu: {
                  parenMenuResourceId: 16,
                  type: 3,
                  menuTitle: "تغییرات نماد",
                  menuIcon: "fas fa-money-bill",
                  menuPage: {
                    pageLink: "/main/monitoring/changedSymbols/symbol"
                  }
                }
              }
            ]
          }, {
            menu: {
              parenMenuResourceId: 15,
              type: 3,
              menuTitle: "ویندوز سرویس ها",
              menuIcon: "fas fa-money-bill"
            },
            childs: [
              {
                childs: [],
                menu: {
                  parenMenuResourceId: 16,
                  type: 3,
                  menuTitle: "وضعیت ویندوز سرویس ها",
                  menuIcon: "fas fa-money-bill",
                  menuPage: {
                    pageLink: "/main/monitoring/agentStatus/agent"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        menu: {
          parenMenuResourceId: null,
          type: 3,
          menuTitle: "تحلیل"
        },
        childs: [
          {
            menu: {
              parenMenuResourceId: 15,
              type: 3,
              menuTitle: "تحلیل بنیادی",
              menuIcon: "fas fa-money-bill"
            },
            childs: [
              {
                childs: [],
                menu: {
                  parenMenuResourceId: 16,
                  type: 3,
                  menuTitle: "تحلیل های بنیادی",
                  menuIcon: "fas fa-money-bill",
                  menuPage: {
                    pageLink: "/main/analysis/fundamentalAnalysis/fundamentalAnalysis"
                  }
                }
              },
              {
                childs: [],
                menu: {
                  parenMenuResourceId: 16,
                  type: 3,
                  menuTitle: "افزودن تحلیل بنیادی",
                  menuIcon: "fas fa-money-bill",
                  menuPage: {
                    pageLink: "/main/analysis/fundamentalAnalysis/addFundamentalAnalysis"
                  }
                }
              },
              {
                childs: [],
                menu: {
                  parenMenuResourceId: 16,
                  type: 3,
                  menuTitle: "اخبار",
                  menuIcon: "fas fa-money-bill",
                  menuPage: {
                    pageLink: "/main/analysis/news/news"
                  }
                }
              },
              {
                childs: [],
                menu: {
                  parenMenuResourceId: 16,
                  type: 3,
                  menuTitle: "افزودن خبر",
                  menuIcon: "fas fa-money-bill",
                  menuPage: {
                    pageLink: "/main/analysis/news/addNews"
                  }
                }
              }
            ]
          }
        ]
      }
    );
    this.setState({
      searchItems: staticMenu
    })
    // this.getAllAccessedMenu();
  }

  getAllAccessedMenu() {
    var command = {
      entity: {
        dateFilter: {

        }
      }
    };
    NestedListService.getAllAccessedMenu(command, this.successGetAllAccessedMenu)
  }
  successGetAllAccessedMenu(response) {

    if (response.success) {
      this.setState({ menuList: response.result }, () => {
        this.setState({ searchItems: sideBarMenuList.searchItems(response.result, this.state.search) }, () => {
          // var staticMenu = this.state.searchItems;
          var staticMenu = [];
          // staticMenu.unshift({
          staticMenu.push({
            menu: {
              parenMenuResourceId: null,
              type: 3,
              menuTitle: "مجامع"
            },
            childs: [
              {
                menu: {
                  parenMenuResourceId: 15,
                  type: 3,
                  menuTitle: "مجامع و اطلاعیه‌ها",
                  menuIcon: "fas fa-info"
                },
                childs: [
                  {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "لیست اطلاعیه‌ها",
                      menuIcon: "fas fa-info",
                      menuPage: {
                        pageLink: "/main/statement/statementAndInformation/index"
                      }
                    }
                  }, {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "تعدیلات قیمت",
                      menuIcon: "fas fa-money-bill",
                      menuPage: {
                        pageLink: "/main/statement/statementAndInformation/adjustedPrice"
                      }
                    }
                  }, {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "محاسبه قیمت تعدیلی",
                      menuIcon: "fas fa-calculator",
                      menuPage: {
                        pageLink: "/main/statement/statementAndInformation/calculateAdjustedPrice"
                      }
                    }
                  }, {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "لیست زمان‌بندی تقسیم سود سهام",
                      menuIcon: "fas fa-clock",
                      menuPage: {
                        pageLink: "/main/statement/statementAndInformation/dividendTiming"
                      }
                    }
                  }, {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "لیست زمان‌بندی شرکت در حق تقدم",
                      menuIcon: "fas fa-clock",
                      menuPage: {
                        pageLink: "/main/statement/statementAndInformation/stockRightTiming"
                      }
                    }
                  }, {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "افزودن مجمع",
                      menuIcon: "fas fa-plus",
                      menuPage: {
                        pageLink: "/main/statement/statementAndInformation/addStatement"
                      }
                    }
                  }
                ]
              }
            ]
          }, {
            menu: {
              parenMenuResourceId: null,
              type: 3,
              menuTitle: "اوراق با درآمد ثابت"
            },
            childs: [
              {
                menu: {
                  parenMenuResourceId: 15,
                  type: 3,
                  menuTitle: "اوراق با درآمد ثابت",
                  menuIcon: "fas fa-copy"
                },
                childs: [
                  {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "لیست اوراق",
                      menuIcon: "fas fa-copy",
                      menuPage: {
                        pageLink: "/main/bond/bonds/bonds"
                      }
                    }
                  }, {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "سود اوراق",
                      menuIcon: "fas fa-money-bill",
                      menuPage: {
                        pageLink: "/main/bond/bonds/accruedInterest"
                      }
                    }
                  }, {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "ارزش روزانه سلف",
                      menuIcon: "fas fa-calculator",
                      menuPage: {
                        pageLink: "/main/bond/bonds/dailyForwardPrice"
                      }
                    }
                  }
                ]
              }
            ]
          }, {
            menu: {
              parenMenuResourceId: null,
              type: 3,
              menuTitle: "داده های بازار"
            },
            childs: [
              {
                menu: {
                  parenMenuResourceId: 15,
                  type: 3,
                  menuTitle: "تعطیلات",
                  menuIcon: "fas fa-money-bill"
                },
                childs: [
                  {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "لیست تعطیلات",
                      menuIcon: "fas fa-money-bill",
                      menuPage: {
                        pageLink: "/main/marketData/holiday/holiday"
                      }
                    }
                  },
                  {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "افزودن تعطیلات",
                      menuIcon: "fas fa-plus",
                      menuPage: {
                        pageLink: "/main/marketData/holiday/addHoliday"
                      }
                    }
                  }
                ]
              }, {
                menu: {
                  parenMenuResourceId: 15,
                  type: 3,
                  menuTitle: "(Option) اختیار معامله",
                  menuIcon: "fas fa-money-bill"
                },
                childs: [
                  {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "لیست اختیار معامله",
                      menuIcon: "fas fa-money-bill",
                      menuPage: {
                        pageLink: "/main/marketData/optionDetails/options"
                      }
                    }
                  },
                  {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "افزودن اختیار معامله",
                      menuIcon: "fas fa-plus",
                      menuPage: {
                        pageLink: "/main/marketData/optionDetails/saveOptionDetail"
                      }
                    }
                  }
                ]
              }, {
                menu: {
                  parenMenuResourceId: 15,
                  type: 3,
                  menuTitle: "معاملات آتی سهام",
                  menuIcon: "fas fa-money-bill"
                },
                childs: [
                  {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "لیست معاملات آتی سهام",
                      menuIcon: "fas fa-money-bill",
                      menuPage: {
                        pageLink: "/main/marketData/futureContract/futureContract"
                      }
                    }
                  },
                  {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "افزودن معاملات آتی سهام",
                      menuIcon: "fas fa-plus",
                      menuPage: {
                        pageLink: "/main/marketData/futureContract/saveFutureContract"
                      }
                    }
                  }
                ]
              }, {
                menu: {
                  parenMenuResourceId: 15,
                  type: 3,
                  menuTitle: "بانک‌ها",
                  menuIcon: "fas fa-money-bill"
                },
                childs: [
                  {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "لیست بانک‌ها",
                      menuIcon: "fas fa-money-bill",
                      menuPage: {
                        pageLink: "/main/marketData/bank/bank"
                      }
                    }
                  },
                  {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "افزودن بانک",
                      menuIcon: "fas fa-plus",
                      menuPage: {
                        pageLink: "/main/marketData/bank/addBank"
                      }
                    }
                  }
                ]
              }, {
                menu: {
                  parenMenuResourceId: 15,
                  type: 3,
                  menuTitle: "کارگزارها",
                  menuIcon: "fas fa-money-bill"
                },
                childs: [
                  {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "لیست کارگزارها",
                      menuIcon: "fas fa-money-bill",
                      menuPage: {
                        pageLink: "/main/marketData/broker/broker"
                      }
                    }
                  },
                  {
                    childs: [],
                    menu: {
                      parenMenuResourceId: 16,
                      type: 3,
                      menuTitle: "افزودن کارگزاری",
                      menuIcon: "fas fa-plus",
                      menuPage: {
                        pageLink: "/main/marketData/broker/addBroker"
                      }
                    }
                  }
                ]
              }
            ]
          },
            {
              menu: {
                parenMenuResourceId: null,
                type: 3,
                menuTitle: "مانیتورینگ"
              },
              childs: [
                {
                  menu: {
                    parenMenuResourceId: 15,
                    type: 3,
                    menuTitle: "تغییرات داده های بازار",
                    menuIcon: "fas fa-money-bill"
                  },
                  childs: [
                    {
                      childs: [],
                      menu: {
                        parenMenuResourceId: 16,
                        type: 3,
                        menuTitle: "تغییرات نماد",
                        menuIcon: "fas fa-money-bill",
                        menuPage: {
                          pageLink: "/main/monitoring/changedSymbols/symbol"
                        }
                      }
                    }
                  ]
                }, {
                  menu: {
                    parenMenuResourceId: 15,
                    type: 3,
                    menuTitle: "ویندوز سرویس ها",
                    menuIcon: "fas fa-money-bill"
                  },
                  childs: [
                    {
                      childs: [],
                      menu: {
                        parenMenuResourceId: 16,
                        type: 3,
                        menuTitle: "وضعیت ویندوز سرویس ها",
                        menuIcon: "fas fa-money-bill",
                        menuPage: {
                          pageLink: "/main/monitoring/agentStatus/agent"
                        }
                      }
                    }
                  ]
                }
              ]
            },
            //   {
            //     menu: {
            //       parenMenuResourceId: null,
            //       type: 3,
            //       menuTitle: ""
            //     },
            //     childs: []
            //   }, {
            //   menu: {
            //     parenMenuResourceId: null,
            //     type: 3,
            //     menuTitle: ""
            //   },
            //   childs: []
            // }, {
            //   menu: {
            //     parenMenuResourceId: null,
            //     type: 3,
            //     menuTitle: ""
            //   },
            //   childs: []
            // }, {
            //   menu: {
            //     parenMenuResourceId: null,
            //     type: 3,
            //     menuTitle: ""
            //   },
            //   childs: []
            // }, {
            //   menu: {
            //     parenMenuResourceId: null,
            //     type: 3,
            //     menuTitle: ""
            //   },
            //   childs: []
            // }, {
            //   menu: {
            //     parenMenuResourceId: null,
            //     type: 3,
            //     menuTitle: ""
            //   },
            //   childs: []
            // }, {
            //   menu: {
            //     parenMenuResourceId: null,
            //     type: 3,
            //     menuTitle: ""
            //   },
            //   childs: []
            // }, {
            //   menu: {
            //     parenMenuResourceId: null,
            //     type: 3,
            //     menuTitle: ""
            //   },
            //   childs: []
            // }, {
            //   menu: {
            //     parenMenuResourceId: null,
            //     type: 3,
            //     menuTitle: ""
            //   },
            //   childs: []
            // }, {
            //   menu: {
            //     parenMenuResourceId: null,
            //     type: 3,
            //     menuTitle: ""
            //   },
            //   childs: []
            // }
          );
          this.setState({
            searchItems: staticMenu
          })
        });
      });
    }
  }
  displayList(item, classes) {

    if (item.menu.parenMenuResourceId == null && item.menu.type === 3) {

      return (<LinkGroup key={item.menu.id} title={item.menu.menuTitle} children={item.childs} />)

    } else if (item.menu.parenMenuResourceId != null && item.menu.type === 3 && item.childs.length > 0) {

      return (<DropDownList key={item.menu.id} children={item.childs} title={item.menu.menuTitle} open={item.open} icon={item.menu.menuIcon} />)

    } else if (item.menu.type === 3 && item.childs.length === 0) {

      return (<DisplayLink id={item.menu.id} icon={item.menu.menuIcon} title={item.menu.menuTitle} to={item.menu.menuPage.pageLink} />);

    }
  }

  handleSearch() {

    this.setState({ searchItems: sideBarMenuList.searchItems(this.state.menuList, this.state.search) });
  }
  handleChangeSearchField(event) {
    this.setState({ search: event.target.value }, () => {
      this.handleSearch();
    });

  }
  enterSubmit = (event) => {
    if (event.keyCode === 13) {
      this.handleSearch();
    }
  };


  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>


        <Paper className={classNames(classes.searchPaper, "searchPaper")} elevation={1}>

          <InputBase className={classes.input, classes.inputSidebar} value={this.state.search} onChange={this.handleChangeSearchField} onKeyDown={this.enterSubmit} placeholder="جستجوی عناوین" />
          <IconButton className={classes.searchIcon} onClick={this.handleSearch} aria-label="Search">
            <SearchIcon />
          </IconButton>


        </Paper>
        <List>
          {
            this.state.searchItems.map(item => {
              return (this.displayList(item, classes))
            })
          }
        </List>
      </React.Fragment>

    );
  };

};

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
