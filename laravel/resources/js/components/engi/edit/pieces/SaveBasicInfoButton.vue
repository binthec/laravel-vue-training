<template>
    <button v-if="is_editor_mode"
        type="button"
        class="btn btn-primary float-right"
        @click="saveBasicInfo"
    >基本設定を保存
    </button>

    <button v-else
        type="button"
        class="btn btn-warning float-right"
        @click="changeToEditorMode"
    >基本設定を編集
    </button>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

import SaveButton from "../../../common/buttons/SaveButton";

export default {
    name: "SaveBasicInfoButton",

    components: {
        SaveButton
    },

    data() {
        return {
            isDisabled: false,
        }
    },

    computed: {
        ...mapState('engi/edit', [
            'uuid',
            'is_editor_mode'
        ])
    },

    methods: {
        ...mapActions('engi/edit', [
            'createEngi',
            'updateEngi'
        ]),

        ...mapMutations('engi/edit',[
            'setEditorMode'
        ]),

        ...mapActions('item/category', [
            'getSecondCategories'
        ]),

        saveBasicInfo() {
            if (this.uuid) {
                this.updateEngi({onlyBasicInfo: true});
            } else {
                this.createEngi({onlyBasicInfo: true});
            }
            this.getSecondCategories();
            this.setEditorMode({value: false});
        },

        changeToEditorMode(){
            this.setEditorMode({value: true});
        }
    }
}
</script>

<style scoped>

</style>
