<template>
    <div>
        <div class="col-4">
            <a class="navbar-brand" href="/">
               <img src="/img/logo.png" alt="logo" width="200">
            </a>
        </div>
        <div class="col-12 p-ms-5 p-lg-5 contact-us">
            <div class="row">
                <div class="col-12 col-sm-6 col-lg-6 message">
                    <div class="title p-3">
                        <h2>{{$t('footer.contactus')}}</h2>
                    </div>
                    <div class="row">
                        <div class="col-12 col-sm-6 col-lg-6">
                            <div class="form-group">
                                <div class="col-12">
                                    <input class="form-control" name="first-name" v-validate="'required|max:30'" :class="{'input': true, 'input-danger': errors.has('email') }"
                                        type="text" :placeholder="$t('footer.first_name')" v-model="first_name">
                                    <span v-show="errors.has('first-name')" class="help is-danger">{{errors.first('first-name')}}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-12">
                                    <input class="form-control" name="phone-number" v-validate="'required|numeric|max:20'" :class="{'input': true, 'input-danger': errors.has('phone-number') }"
                                        type="text" v-model="number" :placeholder="$t('footer.phone_number')">
                                    <span v-show="errors.has('phone-number')" class="help is-danger">{{errors.first('phone-number')}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-lg-6">
                            <div class="form-group">
                                <div class="col-12">
                                    <input class="form-control" name="last-name" v-validate="'required|max:30'" :class="{'input': true, 'input-danger': errors.has('email') }"
                                        type="text" :placeholder="$t('footer.last_name')" v-model="last_name">
                                    <span v-show="errors.has('last-name')" class="help is-danger">{{errors.first('last-name')}}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-12">
                                    <input class="form-control" name="email" v-validate="'required|email|max:50'" :class="{'input': true, 'input-danger': errors.has('email') }"
                                        type="email" v-model="email" :placeholder="$t('footer.email')">
                                    <span v-show="errors.has('email')" class="help is-danger">{{errors.first('email')}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <div class="col-12">
                                    <textarea class="form-control" :class="{'input': true, 'input-danger': errors.has('email') }" v-validate="'required|max:200'"
                                        name="message" v-model="message" type="text" :placeholder="$t('footer.message')"></textarea>
                                    <span v-show="errors.has('message')" class="help is-danger">{{errors.first('message')}}</span>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-12">
                                    <button class="btn btn-primary" @click="SEND_MESSAGE">{{$t('report.send')}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-4 col-lg-4 mt-5 p-3 address">
                    <ul class="list-unstyled">
                        <li>{{$t('footer.email')}}: contact@cinemirna.com</li>
                        <li>{{$t('footer.phone_number')}}: +880023123</li>
                        <li>{{$t('footer.address')}}: San Jose, CA 000xxx</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const alertify = require("alertify.js");
    export default {
        data() {
            return {
                first_name: null,
                last_name: null,
                number: null,
                email: null,
                message: null,
            }
        },
        methods: {
            SEND_MESSAGE() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        axios.post('/api/v1/contactus', {
                            first_name: this.first_name,
                            last_name: this.last_name,
                            phone_number: this.number,
                            email: this.email,
                            message: this.message
                        }).then(res => {
                            if (res.data.status === 'success') {
                                alertify.logPosition("top right");
                                alertify.success(this.$t('footer.success_send'));
                            } else {
                                alertify.logPosition("top right");
                                alertify.error(this.$t('footer.tryanothertime'));
                            }
                        })
                    }
                })
            }
        }
    }
</script>