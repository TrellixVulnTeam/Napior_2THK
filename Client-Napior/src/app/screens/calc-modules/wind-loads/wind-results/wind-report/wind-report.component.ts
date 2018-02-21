import { Component, OnInit, Input, ElementRef, ChangeDetectorRef, DoCheck, ChangeDetectionStrategy, ApplicationRef } from '@angular/core';
import { MathDirective } from '../../../general/report/math.directive';
import { MathLineDirective } from '../../../general/report/math-line.directive';
import { ReportService } from '../../../general/report/report.service';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';
import * as katex from 'katex';

@Component({
  selector: 'app-wind-report',
  templateUrl: './wind-report.component.html',
  styleUrls: ['./wind-report.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindReportComponent implements OnInit {
  
  public report = this.calc.results.B.reportValues;
  public results = this.calc.results;
  public inputs = this.calc.inputs;
  private reportSubscription;
  public rigid: boolean;
  public graphicWidth = (window.innerWidth - 500) * 0.39;
  public graphicHeight = (window.innerWidth - 500) * 0.2;

  public meanRoof: string;
  public kzSmall: string;
  public kzLarge: string;
  public K1: string;
  public K2: string;
  public K3: string;
  public Kzt: string;
  public qz: string;
  public Lz: string;
  public Iz: string;
  public VbarZbar: string;
  public N1: string;
  public Rn: string;
  public etah: string;
  public etaB: string;
  public etaL: string;
  public Rh: string;
  public RB: string;
  public RL: string;
  public R: string;
  public gR: string
  public QB: string;
  public GRigidB: string;
  public GFlexVarB: string;
  public GFlexNumB: string;
  public QL: string;
  public GRigidL: string;
  public GFlexVarL: string;
  public GFlexNumL: string;
  public FxB: string;
  public V: string;
  public FxL: string;
  public maxWindPRoofB: string;
  public minWindPRoofB: string;
  public leePRoofB: string;
  public maxWindPRoofL: string;
  public minWindPRoofL: string;
  public leePRoofL: string;
  public CandC: string;

  

  constructor( private el: ElementRef, private cd: ChangeDetectorRef,  public calc: RunCalcService, public genReport: ReportService ) { }

  generateReport() {
    // Math strings for Math (katex) directive.
    this.meanRoof = `\\text{Eave Height} +\\frac{1}{2}(L)tan(\\theta) = (${this.calc.results.B.Height} \\, ft) + \\frac{1}{2}(${this.calc.inputs.buildingLength}\\, ft)tan(${this.calc.inputs.roofSlope}\\degree) `;
    this.kzSmall = `2.01(15/z_{g})^{2/\\alpha}`;
    this.kzLarge = `2.01(z/z_{g})^{2/\\alpha}`;
    this.K1 = `\\frac{K_{1}}{(H/L_{h})}*(H/L_{h})=(${this.calc.results.B.reportValues.K1HLh})*(${this.calc.inputs.hillHeight} ft/${this.calc.inputs.halfHeightToCrest} ft)`;
    this.K2 = `1-\\frac{|x|}{\\mu L_{h}} = 1-\\frac{|${this.calc.inputs.crestToBuilding} ft|}{(${this.calc.results.B.reportValues.mu})(${this.calc.inputs.halfHeightToCrest} ft)}`;
    this.K3 = `e^{\\gamma z / L_{h}}`;
    this.Kzt = `(1+K_{1}K_{2}K_{3})^{2}`;
    this.qz = `0.00256K_{z}K_{zt}K_{d}V^{2}`;
    this.Lz = `l\\Biggl(\\frac{\\bar{z}}{33}\\Biggr)^{\\bar{\\epsilon}}=${this.report.Gust_Coeff.l}'\\Biggl(\\frac{${this.report.z_bar}'}{33}\\Biggr)^{${this.report.Gust_Coeff.epsilon_bar}}`;
    this.Iz = `c\\Biggl(\\frac{33}{\\bar{z}}\\Biggr)^{1/6}=${this.report.Gust_Coeff.c}'\\Biggl(\\frac{33}{${this.report.z_bar}'}\\Biggr)^{1/6}`;
    this.VbarZbar = `\\bar{b}\\Biggl(\\frac{\\bar{z}}{33}\\Biggr)^{\\bar{\\alpha}}\\Biggl(\\frac{88}{60}\\Biggr)V = (${this.report.Gust_Coeff.b_bar})\\Biggl(\\frac{${this.report.z_bar}}{33}\\Biggr)^{${this.report.alpha_bar}}\\Biggl(\\frac{88}{60}\\Biggr)(${this.inputs.V} mph)`;
    this.N1 = `\\frac{n_{1}L_{\\bar{z}}}{\\bar{V}_{\\bar{z}}}=\\frac{(${this.calc.results.B.reportValues.n1} hz)(${this.calc.results.B.reportValues.L_z}) ft}{${this.report.flex_factors.V_z_bar} ft/s}`;
    this.Rn = `\\frac{7.47N_{1}}{(1+10.3N_{1})^{5/3}}=\\frac{7.47(${this.calc.results.B.reportValues.flex_factors.N1})}{(1+10.3(${this.calc.results.B.reportValues.flex_factors.N1}))^{5/3}}`;
    this.etah = `4.6n_{1}h/\\bar{V}_{\\bar{z}}=4.6(${this.calc.results.B.reportValues.n1} hz)(${this.calc.results.B.Height} ft)/${this.report.flex_factors.V_z_bar} ft/s`;
    this.etaB = `4.6n_{1}h/\\bar{V}_{\\bar{z}}=4.6(${this.calc.results.B.reportValues.n1} hz)(${this.calc.inputs.buildingWidth} ft)/${this.report.flex_factors.V_z_bar} ft/s`;
    this.etaL = `15.4n_{1}h/\\bar{V}_{\\bar{z}}=4.6(${this.calc.results.B.reportValues.n1} hz)(${this.calc.inputs.buildingLength} ft)/${this.report.flex_factors.V_z_bar} ft/s`;
    this.Rh = `\\frac{1}{\\eta_{h}}-\\frac{1}{2\\eta_{h}^2}(1-e^{-2\\eta_{h}})=\\frac{1}{(${this.report.flex_factors.nu_h})}-\\frac{1}{2(${this.report.flex_factors.nu_h})^2}(1-e^{-2(${this.report.flex_factors.nu_h})})`;
    this.RB = `\\frac{1}{\\eta_{h}}-\\frac{1}{2\\eta_{h}^2}(1-e^{-2\\eta_{h}})=\\frac{1}{(${this.report.flex_factors.nu_B})}-\\frac{1}{2(${this.report.flex_factors.nu_B})^2}(1-e^{-2(${this.report.flex_factors.nu_B})})`;
    this.RL = `\\frac{1}{\\eta_{h}}-\\frac{1}{2\\eta_{h}^2}(1-e^{-2\\eta_{h}})=\\frac{1}{(${this.report.flex_factors.nu_L})}-\\frac{1}{2(${this.report.flex_factors.nu_L})^2}(1-e^{-2(${this.report.flex_factors.nu_L})})`;
    this.R = `\\sqrt{\\frac{1}{\\beta}R_{n}R_{h}R_{B}(0.53+0.47R_{L})}=\\sqrt{\\frac{1}{\\beta}(${this.report.flex_factors.R_h})(${this.report.flex_factors.R_h})(${this.report.flex_factors.R_h})(0.53+0.47(${this.report.flex_factors.R_h}))}`;
    this.gR = `\\sqrt{2ln(3600n_{1})}+\\frac{0.577}{\\sqrt{2ln(3600n_{1})}}=\\sqrt{2ln(3600(${this.calc.results.B.reportValues.n1} hz))}+\\frac{0.577}{\\sqrt{2ln(3600(${this.calc.results.B.reportValues.n1} hz))}}`;
    this.QB = `\\sqrt{\\frac{1}{1+0.63\\Bigl(\\frac{B+h}{L_{\\bar{z}}}\\Bigr)^{0.63}}} = \\sqrt{\\frac{1}{1+0.63\\Bigl(\\frac{${this.calc.inputs.buildingWidth} ft+${this.results.B.MeanRoofHeight} ft}{${this.report.L_z} ft}\\Bigr)^{0.63}}}`;
    this.GFlexVarB = `0.925\\Biggl(\\frac{1+1.7I_{\\bar{z}}\\sqrt{g_{Q}^{2}Q_{\\perp B}^{2}+g_{R}^{2}R^{2}}}{1+1.7g_{v}I_{\\bar{z}}} \\Biggr)`;
    this.GFlexNumB = `0.925\\Biggl(\\frac{1+1.7(${this.report.I_z})\\sqrt{(3.4)^{2}(${this.calc.results.B.reportValues.Q})^{2}+(3.4)^{2}R^{2}}}{1+1.7g_{v}I_{\\bar{z}}} \\Biggr)`;
    this.GRigidB = `0.925\\Biggl(\\frac{1+1.7g_{Q}I_{\\bar{z}}Q_{\\perp B}}{1+1.7g_{v}I_{\\bar{z}}}\\Biggr)=0.925\\Biggl(\\frac{1+1.7(3.4)(${this.report.I_z})(${this.calc.results.B.reportValues.Q})}{1+1.7(3.4)(${this.report.I_z})}\\Biggr)`;
    this.QL = `\\sqrt{\\frac{1}{1+0.63\\Bigl(\\frac{L+h}{L_{\\bar{z}}}\\Bigr)^{0.63}}} = \\sqrt{\\frac{1}{1+0.63\\Bigl(\\frac{${this.calc.inputs.buildingLength} ft+${this.results.B.MeanRoofHeight} ft}{${this.report.L_z} ft}\\Bigr)^{0.63}}}`;
    this.GFlexVarL = `0.925\\Biggl(\\frac{1+1.7I_{\\bar{z}}\\sqrt{g_{Q}^{2}Q_{\\perp L}^{2}+g_{R}^{2}R^{2}}}{1+1.7g_{v}I_{\\bar{z}}} \\Biggr)`;
    this.GFlexNumL = `0.925\\Biggl(\\frac{1+1.7(${this.report.I_z})\\sqrt{(3.4)^{2}(${this.calc.results.L.reportValues.Q})^{2}+(3.4)^{2}R^{2}}}{1+1.7g_{v}I_{\\bar{z}}} \\Biggr)`;
    this.GRigidL = `0.925\\Biggl(\\frac{1+1.7g_{Q}I_{\\bar{z}}Q_{\\perp L}}{1+1.7g_{v}I_{\\bar{z}}}\\Biggr)=0.925\\Biggl(\\frac{1+1.7(3.4)(${this.report.I_z})(${this.calc.results.L.reportValues.Q})}{1+1.7(3.4)(${this.report.I_z})}\\Biggr)`;
    this.FxB = `p_{total}\\Biggl(B_{x}\\Biggl(\\frac{1}{2}H_{x}+\\frac{1}{2}H_{x+1}\\Biggr)\\Biggl)=p_{total} * A_{Tributary}`;
    this.V = `\\sum_{i=1}^{n} F_{x}`;
    this.FxL = `p_{total}\\Biggl(L_{x}\\Biggl(\\frac{1}{2}H_{x}+\\frac{1}{2}H_{x+1}\\Biggr)\\Biggl)=p_{total} * A_{Tributary}`;
    this.maxWindPRoofB = `q_{h}GC_{p}=(${this.calc.results.B.reportValues.q_h} psf)(${this.calc.results.B.reportValues.G})(${this.calc.results.B.Cp_roof_windward_max})`;
    this.minWindPRoofB = `q_{h}GC_{p}=(${this.calc.results.B.reportValues.q_h} psf)(${this.calc.results.B.reportValues.G})(${this.calc.results.B.Cp_roof_windward_min})`;
    this.leePRoofB = `q_{h}GC_{p}=(${this.calc.results.B.reportValues.q_h} psf)(${this.calc.results.B.reportValues.G})(${this.calc.results.B.Cp_roof_leeward})`;
    this.maxWindPRoofL = `q_{h}GC_{p}=(${this.calc.results.L.reportValues.q_h} psf)(${this.calc.results.L.reportValues.G})(${this.calc.results.L.Cp_roof_windward_max})`;
    this.minWindPRoofL = `q_{h}GC_{p}=(${this.calc.results.L.reportValues.q_h} psf)(${this.calc.results.L.reportValues.G})(${this.calc.results.L.Cp_roof_windward_min})`;
    this.leePRoofL = `q_{h}GC_{p}=(${this.calc.results.L.reportValues.q_h} psf)(${this.calc.results.L.reportValues.G})(${this.calc.results.L.Cp_roof_leeward})`;
    this.CandC = `q_{h}[GC_{p} - GC_{pi}]`;

    this.genReport.generateReportList();
    setTimeout(() => {
      this.cd.detectChanges();
      this.genReport.thickenFracLines();
     }, 5);
  }

  genAndFormatReport(){
    this.generateReport();
    setTimeout(() => {
      this.genReport.controlSqrtLines();
    }, 500);
  }

  ngOnInit() {
    this.rigid = (this.calc.inputs.period < 1) ? true : false;
    this.reportSubscription = this.calc.ranCalc$.subscribe(()=>{
      this.genAndFormatReport();
    })
  }

  ngAfterViewInit(){
    console.log('Draw Report')
    this.genAndFormatReport();
  }

  ngOnDestroy(){
    this.reportSubscription.unsubscribe();
  }

}
