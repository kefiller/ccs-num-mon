const axios = require('axios');

// const client = new CCSHttpApiClient({
//     url: '/api/v1/',
//     auth: 'authToken'
//   });

class CCSApiClient {
    constructor({ url, auth }) {
        this.url = url;
        this.auth = auth;
    }

    systemPing() {
        return this.post({
            'method': 'system.ping'
        });
    }

    systemMethodsList() {
        return this.post({
            'method': 'system.methods.list',
            'auth': this.auth
        });
    }

    a2iCampaignList() {
        return this.post({
            'method': 'a2i.campaign.list',
            'auth': this.auth
        });
    }

    // client.a2iCampaignCreate('mytestcamp2', {
    //     'interval-wtime': '*',
    //     'interval-dow': '*',
    //     'amount': 1,
    //     'retry': 1,
    //     'retry-secs': '60',
    //     'interval-send': '300'
    //   })
    //     .then((data) => {
    //       console.log('request OK', data);
    //     })
    //     .catch((error) => {
    //       console.log('request Error', error);
    //     });

    a2iCampaignCreate(name, settings) {
        return this.post({
            'method': 'a2i.campaign.create',
            'auth': this.auth,
            'params': {
                name,
                settings
            }
        });
    }

    a2iCampaignUpdate(name, settings) {
        return this.post({
            'method': 'a2i.campaign.update',
            'auth': this.auth,
            'params': {
                name,
                settings
            }
        });
    }

    a2iCampaignDrop(name) {
        return this.post({
            'method': 'a2i.campaign.drop',
            'auth': this.auth,
            'params': {
                name
            }
        });
    }

    a2iCampaignStart(name) {
        return this.post({
            'method': 'a2i.campaign.start',
            'auth': this.auth,
            'params': {
                name
            }
        });
    }

    a2iCampaignStop(name) {
        return this.post({
            'method': 'a2i.campaign.stop',
            'auth': this.auth,
            'params': {
                name
            }
        });
    }

    a2iCampaignStatus(name) {
        return new Promise((resolve, reject) => {
            return this.post({
                'method': 'a2i.campaign.status',
                'auth': this.auth,
                'params': {
                    name
                }
            })
            .then(({status}) => {
                resolve(status);
            })
            .catch(error => reject(error));
        });
    }

    a2iCampaignSettings(name) {
        return this.post({
            'method': 'a2i.campaign.settings',
            'auth': this.auth,
            'params': {
                name
            }
        });
    }

    a2iCampaignLog(name, dateFrom = '', dateTo = '') {
        const req = {
            'method': 'a2i.campaign.log',
            'auth': this.auth,
            'params': {
                name
            }
        };

        if(dateFrom !== '' && dateTo !== '') {
            req.params['dateFrom'] = dateFrom;
            req.params['dateTo'] = dateTo;
        }

        return this.post(req);
    }

    a2iCampaignDataGet(name) {
        return this.post({
            'method': 'a2i.campaign.data.get',
            'auth': this.auth,
            'params': {
                name
            }
        });
    }

    a2iCampaignDataAdd(name, data) {
        return this.post({
            'method': 'a2i.campaign.data.add',
            'auth': this.auth,
            'params': {
                name,
                data
            }
        });
    }

    a2iCampaignDataCut(name, data) {
        return this.post({
            'method': 'a2i.campaign.data.cut',
            'auth': this.auth,
            'params': {
                name,
                data
            }
        });
    }

    a2iCampaignTtsGet(name, number) {
        return this.post({
            'method': 'a2i.campaign.tts.get',
            'auth': this.auth,
            'params': {
                name,
                number
            }
        });
    }

    callOriginate(destination, bridgeTarget) {
        return this.post({
            'method': 'call.originate',
            'auth': this.auth,
            'params': {
                destination,
                'bridge-target': bridgeTarget
            }
        });
    }

    post(request) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const req = JSON.stringify(request);

        var urlParams = new URLSearchParams();
        urlParams.append('request', req);

        return new Promise((resolve, reject) => {
            axios.post(this.url, urlParams, config)
                .then((reqResponse) => {

                    const { data = null } = reqResponse;
                    if (!data) {
                        // console.log('empty data', reqResponse);
                        reject(reqResponse);
                        return;
                    }

                    const { error = null } = data;

                    if (error) {
                        // console.log('error', error);
                        reject(error);
                        return;
                    }

                    const { result = null } = data;

                    if (!result) {
                        // console.log('empty result', data);
                        reject(data);
                        return;
                    }

                    const { response = null, ...rest } = result;

                    if (!response) {
                        // console.log('empty response', result);
                        reject(result);
                        return;
                    }

                    if (response !== 'success') {
                        // console.log('bad request', result);
                        reject(result);
                        return;
                    }

                    resolve(rest);
                })
                .catch(error => reject(error));
        });
    }
}

module.exports = {
    CCSApiClient
}