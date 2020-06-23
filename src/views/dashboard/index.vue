<template>
  <div>

    <el-row style="margin-top: 30px;">
      <el-col :span="2" offset="2"></el-col>
      <el-col :span="6" offset="1"> 
          <el-card shadow="always">
            <i class="el-icon-sunset" /> 机器IP：127.0.0.1
          </el-card>
        </el-col>
      <el-col :span="6" offset="1"> 
          <el-card shadow="always">
            <i class="el-icon-user-solid" /> 账户：Admin
          </el-card>
        </el-col>
        <el-col :span="6" offset="1"> 
          <el-card shadow="always">
            <i class="el-icon-bell" /> 系统告警：3    
          </el-card>
        </el-col>
    </el-row>

    <el-row type="flex"  :gutter="30">
        <el-col :span="1" :offset="1"></el-col>
        <el-col :span="6">
            <div class="linux" ref="cpu"></div>
        </el-col>
        <el-col :span="1" :offset="1"></el-col>
        <el-col :span="6">
            <div class="linux" ref="mem"></div>
        </el-col>
        <el-col :span="1" :offset="1"></el-col>
        <el-col :span="6">
            <div class="linux" ref="disk"></div>
        </el-col>
        <el-col :span="1" :offset="1"></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div style="width:100%;height:250px" ref="userReq"></div></el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data(){
      return {
        cpu: {tooltip:{formatter:'{a} <br/>{b} : {c}%'},series:[{name:'CPU',type:'gauge',detail:{formatter:'{value}%'},data:[{value:20,name:'CPU'}]}]},
        mem: {tooltip:{formatter:'{a} <br/>{b} : {c}%'},series:[{name:'内存',type:'gauge',detail:{formatter:'{value}%'},data:[{value:50,name:'内存'}]}]},
        disk: {tooltip:{formatter:'{a} <br/>{b} : {c}%'},series:[{name:'磁盘',type:'gauge',detail:{formatter:'{value}%'},data:[{value:45,name:'磁盘'}]}]},
        userReq: {xAxis:{type:'category',data:['-6','-5','-4','-3','-2','-1','0']},yAxis:{type:'value'},series:[{data:[820,932,901,934,1290,1330,1320],type:'line'}]}
      }
  },
  computed: {
    ...mapGetters(["name"])
  },
  mounted: function() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      this.chartCpu = this.$echarts.init(this.$refs.cpu);
      this.chartMem = this.$echarts.init(this.$refs.mem);
      this.chartDisk = this.$echarts.init(this.$refs.disk);
      this.chartUserReq = this.$echarts.init(this.$refs.userReq);
      this.setOptions();
    },
    setOptions() {
      this.chartCpu.setOption(this.cpu, true);
      this.chartMem.setOption(this.mem, true);
      this.chartDisk.setOption(this.disk, true);
      this.chartUserReq.setOption(this.userReq, true);
      let that = this;
      setInterval(function () {
        that.cpu.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        that.chartCpu.setOption(that.cpu, true);
      },1000);
      setInterval(function () {
        that.disk.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        that.chartDisk.setOption(that.disk, true);
      },6000);
      setInterval(function () {
        that.mem.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        that.chartMem.setOption(that.mem, true);
      },6000);

    }
  }
};
</script>


<style scoped>
.linux{
    width: 350px;
    height: 350px;
}
</style>