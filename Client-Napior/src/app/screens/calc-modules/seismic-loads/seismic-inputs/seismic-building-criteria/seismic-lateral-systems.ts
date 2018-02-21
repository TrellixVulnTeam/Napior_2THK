export class SeismicLateralSystems {
  public bearingWalls: any[];
  public buildingFrames: any[];
  public cantileverColumns: any[];
  public dualSystemsInt: any[];
  public dualSystemsSpec: any[];
  public momentFrames: any[];
  public concSWmomentFrames: any[];
  public r3app: any[];

  constructor() {
    this.bearingWalls = [
      {
        "system": "Special reinforced concrete shear walls",
        "R": 5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary reinforced concrete shear walls",
        "R": 4,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Detailed plain concrete shear walls",
        "R": 2,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary plain concrete shear walls",
        "R": 1.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Intermediate precast shear walls",
        "R": 4,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary precast shear walls",
        "R": 3,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Special reinforced masonry shear walls",
        "R": 5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Intermediate reinforced masonry shear walls",
        "R": 3.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary reinforced masonry shear walls",
        "R": 2,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Detailed plain masonry shear walls",
        "R": 2,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary plain masonry shear walls",
        "R": 1.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Prestressed masonry shear walls",
        "R": 1.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary reinforced AAC masonry shear walls",
        "R": 2,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary plain AAC masonry shear walls",
        "R": 1.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Light-framed wood shear walls",
        "R": 6.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Light-framed cold-formed steel shear walls",
        "R": 6.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Light-framed walls with shear panels of all other materials",
        "R": 2,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Cold-formed steel walls with flat strap bracing",
        "R": 4,
        "Ct": 0.02,
        "x": 0.75
      }
    ];
    this.buildingFrames = [
      {
        "system": "Steel eccentrically braced frames",
        "R": 8,
        "Ct": 0.03,
        "x": 0.75
      },
      {
        "system": "Special steel concentrically braced frames",
        "R": 6,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary steel concentrically braced frames",
        "R": 3.25,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Special reinforced concrete shear walls",
        "R": 6,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary reinforced concrete shear walls",
        "R": 5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Detailed plain concrete shear walls",
        "R": 2,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary plain concrete shear walls",
        "R": 1.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Intermediate precast shear walls",
        "R": 5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary precast shear walls",
        "R": 4,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel and concrete composite eccentrically braced frames",
        "R": 8,
        "Ct": 0.03,
        "x": 0.75
      },
      {
        "system": "Steel and concrete composite special concentrically braced frames",
        "R": 5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel and concrete composite ordinary braced frames",
        "R": 3,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel and concrete composite plate shear walls",
        "R": 6.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel and concrete composite special shear walls",
        "R": 6,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel and concrete composite ordinary shear walls",
        "R": 5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Special reinforced masonry shear walls",
        "R": 5.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Intermediate reinforced masonry shear walls",
        "R": 4,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary reinforced masonry shear walls",
        "R": 2,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Detailed plain masonry shear walls",
        "R": 2,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary plain masonry shear walls",
        "R": 1.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Prestressed masonry shear walls",
        "R": 1.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Light-framed wood shear walls",
        "R": 7,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Light-framed cold-formed steel shear walls",
        "R": 7,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Light-framed walls with shear panels of all other materials",
        "R": 2.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel buckling-restrained braced frames",
        "R": 8,
        "Ct": 0.03,
        "x": 0.75
      },
      {
        "system": "Special steel plate shear walls",
        "R": 7,
        "Ct": 0.02,
        "x": 0.75
      }
    ]
    this.cantileverColumns = [
      {
        "system": "Steel special cantilever column systems",
        "R": 2.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel ordinary cantilever column systems",
        "R": 1.25,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Special reinforced concrete moment frames",
        "R": 2.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Intermediate reinforced concrete moment frames",
        "R": 1.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary reinforced concrete moment frames",
        "R": 1,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Timber frames",
        "R": 1.5,
        "Ct": 0.02,
        "x": 0.75
      }
    ]
    this.dualSystemsInt = [
      {
        "system": "Steel special concentrically braced frames",
        "R": 6,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Special reinforced concrete shear walls",
        "R": 6.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary reinforced masonry shear walls",
        "R": 3,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Intermediate reinforced masonry shear walls",
        "R": 3.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel & conc comp. special concentrically braced frames",
        "R": 5.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel & conc comp. ordinary concentrically braced frames",
        "R": 3.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel & conc comp. ordinary shear walls",
        "R": 5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary reinforced concrete shear walls",
        "R": 5.5,
        "Ct": 0.02,
        "x": 0.75
      }
    ]
    this.dualSystemsSpec = [
      {
        "system": "Steel eccentrically braced frames",
        "R": 8,
        "Ct": 0.03,
        "x": 0.75
      },
      {
        "system": "Special steel concentrically braced frames",
        "R": 7,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Special reinforced concrete shear walls",
        "R": 7,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Ordinary reinforced concrete shear walls",
        "R": 6,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel & conc composite eccentrically braced frames",
        "R": 8,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel & conc composite concentrically braced frames",
        "R": 6,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel & conc composite plate shear walls",
        "R": 7.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel & conc composite special shear walls",
        "R": 7,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel & conc composite ordinary shear walls",
        "R": 6,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Special reinforced masonry shear walls",
        "R": 5.5,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Intermediate reinforced masonry shear walls",
        "R": 4,
        "Ct": 0.02,
        "x": 0.75
      },
      {
        "system": "Steel buckling-restrained braced frame",
        "R": 8,
        "Ct": 0.03,
        "x": 0.75
      },
      {
        "system": "Steel special plate shear walls",
        "R": 8,
        "Ct": 0.02,
        "x": 0.75
      }
    ]
    this.momentFrames = [
      {
        "system": "Steel special moment frames",
        "R": 8,
        "Ct": 0.028,
        "x": 0.8
      },
      {
        "system": "Steel special truss moment frames",
        "R": 7,
        "Ct": 0.028,
        "x": 0.8
      },
      {
        "system": "Steel intermediate moment frames",
        "R": 4.5,
        "Ct": 0.028,
        "x": 0.8
      },
      {
        "system": "Steel ordinary moment frames",
        "R": 3.5,
        "Ct": 0.028,
        "x": 0.8
      },
      {
        "system": "Special reinforced concrete moment frames",
        "R": 8,
        "Ct": 0.016,
        "x": 0.9
      },
      {
        "system": "Intermediate reinforced concrete moment frames",
        "R": 5,
        "Ct": 0.016,
        "x": 0.9
      },
      {
        "system": "Ordinary reinforced concrete moment frames",
        "R": 3,
        "Ct": 0.016,
        "x": 0.9
      },
      {
        "system": "Steel & conc comp. special moment frames",
        "R": 8,
        "Ct": 0.016,
        "x": 0.9
      },
      {
        "system": "Steel & conc comp. intermediate moment frames",
        "R": 5,
        "Ct": 0.016,
        "x": 0.9
      },
      {
        "system": "Steel & conc comp. partially restrained moment frames",
        "R": 6,
        "Ct": 0.016,
        "x": 0.9
      },
      {
        "system": "Steel & conc comp. ordinary moment frames",
        "R": 3,
        "Ct": 0.016,
        "x": 0.9
      },
      {
        "system": "Cold-formed steel - special bolted moment frame",
        "R": 3.5,
        "Ct": 0.028,
        "x": 0.8
      }
    ]
    this.concSWmomentFrames = [
      {
        "system": "Interactive conc shear wall and moment frames",
        "R": 4.5,
        "Ct": 0.02,
        "x": 0.75
      }
    ]
    this.r3app = [
      {
        "system": "R = 3 Applications",
        "R": 3,
        "Ct": 0.02,
        "x": 0.75
      }
    ]
  }
}
